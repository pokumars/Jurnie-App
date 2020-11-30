import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DefaultCard } from '../components/Cards/Cards';
import { BoldText, TextXS } from '../components/Text/Text';
import color from '../constants/color';
import globalStyle from '../constants/globalStyle';
import { Picker } from '@react-native-picker/picker';
import {
  transportModes,
  answerTypes,
  ABORT,
  PROCEED,
  exampleTripObject,
  capitaliseModeofTransport,
  extractModeofTransport,
} from '../helpers/TmdTransportModes';
import QuestionModal from '../components/QuestionModal';
import { StackActions } from '@react-navigation/native';
import {
  allocatePoints,
  transportModeQuestions,
} from '../helpers/TmdTransportQuestions';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
//import firebase from '@react-native-firebase';

const Questionnaire = ({ navigation, route }) => {
  /* if feedGiven is false, then isCorrectTransportMode should be null. Because
  user cant proceed to give feedback until they have answered isCorrectTransportMode.
  This condition is so that if user clicks yes/no but then  aborts feedback altogether,
  the next time they come back, isCorrectTransportMode will be null so that they get the
  chance to choose the correct one */ // TODO: the above
  const [isCorrectTransportMode, setIsCorrectTransportMode] = useState(null);
  const [selectedMode, setSelectedMode] = useState(
    exampleTripObject.activityType,
  );
  const [questionNumber, setQuestionNumber] = useState(null);

  // after each question is done, the answer is set. Pass in things like id, origin and polyline as props when the user clicks on the questionnaire
  const [answers, setAnswers] = useState({
    feedGiven: false,
    activityType: selectedMode,
  });
  // TODO: setpoints upon question being answered....based on question type
  const [points, setPoints] = useState(0);

  console.log(
    `
    isCorrectTransportMode -------------${isCorrectTransportMode}
    selectedMode------------------${selectedMode}
    questionNumber------------------${questionNumber}
    points------------------${points}
    extractModeofTransport(selectedMode)------------------${extractModeofTransport(
      selectedMode,
    )}
    received answers------------------`,
    answers,
  );

  // activityTypeString is required. pass it as props or as part of the passed in trip object
  const activityTypeString = capitaliseModeofTransport(selectedMode);
  const correctTransportModeHandler = () => {
    setIsCorrectTransportMode(true);
    setQuestionNumber(0);
  };

  const nextModalAction = (abortOrProceed) => {
    if (abortOrProceed === ABORT) {
      setQuestionNumber(null);
    }
    if (abortOrProceed === PROCEED) {
      setQuestionNumber(() => setQuestionNumber(questionNumber + 1));
    }
  };

  const appendAnswer = (key, value) => {
    // console.log('append answers -------------key', key);
    // console.log('append answers -------------value', value);
    const obj = { ...answers };
    obj[key] = value;
    setAnswers(obj);
    setPoints(allocatePoints(obj));
    // setPoints(allocatePoints(answers));
  };

  const sendAnswersToFirebase = () => {
    console.log(
      '------------ we are ready to sendAnswer to firebase-------------',
      answers,
    );
    ChecktoFeed();
    navigation.dispatch(StackActions.popToTop());
  };

  const ChecktoFeed = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .doc(route.params.paramKey)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.data());
        //setgiven(querySnapshot.data().feedGiven);
        //console.log(querySnapshot.data().feedGiven);
        if (querySnapshot.data().feedGiven == true) {
          Update();
        } else {
          AddFeedtoFireStore();
        }
      });
  };
  const AddFeedtoFireStore = () => {
    console.log('öööö', route.params.paramKey);
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .doc(route.params.paramKey)
      .update({
        feed1: answers.feed1,
        feed2: answers.feed2,
        feed2: answers.feed3,
        feed4: answers.feed4,
        feedGiven: true,
        img1: answers.img1,
        activityType: answers.activityType,
      })
      .then(() => {
        firestore()
          .collection('users')
          .doc(auth().currentUser.email)
          .update({
            totalFeeds: firebase.firestore.FieldValue.increment(points),
          });
      });
  };

  const Update = () => {
    console.log('awawa');
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .doc(route.params.paramKey)
      .update({
        feed1: answers.feed1,
        feed2: answers.feed2,
        feed2: answers.feed3,
        feed4: answers.feed4,
        feedGiven: true,
        img1: answers.img1,
        activityType: answers.activityType,
      })
      .then(() => {
        if (
          answers.feed1 !== null &&
          answers.feed2 !== null &&
          answers.feed3 !== null &&
          answers.feed4 !== null
        ) {
          firestore()
            .collection('users')
            .doc(auth().currentUser.email)
            .update({
              totalFeeds: firebase.firestore.FieldValue.increment(1),
            });
        }
      });
  };

  return (
    <View>
      <DefaultCard style={styles.card}>
        <Text style={[{ fontSize: TextXS }]}>
          Your mode of transport was <BoldText>{activityTypeString}</BoldText>.
        </Text>
        <Text style={[{ fontSize: TextXS }]}>Is this correct?</Text>
        <View style={globalStyle.buttonsSideBySideContainer}>
          <View style={globalStyle.sideBySideButtonView}>
            <Button title="yes" onPress={correctTransportModeHandler} />
          </View>
          <View style={globalStyle.sideBySideButtonView}>
            <Button
              title="no"
              color={color.ERR_RED}
              onPress={() => setIsCorrectTransportMode(false)}
            />
          </View>
        </View>
      </DefaultCard>
      {isCorrectTransportMode === false && (
        <>
          <Text> Choose the correct one and press YES</Text>
          <Picker
            selectedValue={selectedMode}
            onValueChange={(itemValue) => {
              setSelectedMode(itemValue);
              appendAnswer('activityType', itemValue);
            }}>
            {transportModes.map((mode) => {
              return (
                <Picker.Item
                  key={mode}
                  label={capitaliseModeofTransport(mode)}
                  value={mode}
                />
              );
            })}
          </Picker>
        </>
      )}
      {transportModeQuestions[extractModeofTransport(selectedMode)].map(
        (que, questionIndex) => {
          return (
            <QuestionModal
              key={que.question}
              answerType={que.responseType}
              question={que.question}
              visible={questionNumber === questionIndex}
              nextAction={nextModalAction}
              appendAnswer={appendAnswer}
              questionNumber={questionIndex}
              sendAnswers={sendAnswersToFirebase}
              points={points}
            />
          );
        },
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default Questionnaire;
