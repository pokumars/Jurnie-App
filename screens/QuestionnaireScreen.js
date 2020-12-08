/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';
import { DefaultCard } from '../components/Cards/Cards';
import { BoldText, TextXS } from '../components/Text/Text';
import color from '../constants/color';
import globalStyle from '../constants/globalStyle';
import {
  transportModes,
  ABORT,
  PROCEED,
  exampleTripObject,
  capitaliseModeofTransport,
  extractModeofTransport,
} from '../helpers/TmdTransportModes';
import QuestionModal from '../components/QuestionModal';
import {
  allocatePoints,
  transportModeQuestions,
} from '../helpers/TmdTransportQuestions';

import LoadingFullScreen from '../components/LoadingFullScreen';
// import firebase from '@react-native-firebase';

const Questionnaire = ({ navigation, route }) => {
  /* if feedGiven is false, then isCorrectTransportMode should be null. Because
  user cant proceed to give feedback until they have answered isCorrectTransportMode.
  This condition is so that if user clicks yes/no but then  aborts feedback altogether,
  the next time they come back, isCorrectTransportMode will be null so that they get the
  chance to choose the correct one */ // TODO: the above
  const [isCorrectTransportMode, setIsCorrectTransportMode] = useState(null);
  const [savingLoader, setSavingLoader] = useState(false);

  const [selectedMode, setSelectedMode] = useState(
    exampleTripObject.activityType
  );
  

  const [questionNumber, setQuestionNumber] = useState(null);
  // if it is fresh feedbac, then check if they won some badge if not, dont check. The check happens in MainTab
  const [isItFreshFeedback, setIsItFreshFeedback] = useState(false);
  // console.log('Questionnaire route', route.params.paramtrip);

  // after each question is done, the answer is set. Pass in things like id, origin and polyline as props when the user clicks on the questionnaire
  const [answers, setAnswers] = useState({
    feedGiven: false,
    activityType: selectedMode,
  });

  const getTripFromRouteParams = () => {
    if(route.params !== undefined && route.params.paramtrip !== undefined){
      setSelectedMode(route.params.paramtrip.activityType);
      setSelectedMode(route.params.paramtrip.activityType);
      // if it is fresh feedback update state to reflect that
      if (route.params.paramtrip.feedGiven === false) {
        // console.log('we are about to give fresh feedback');
        setIsItFreshFeedback(true);
      }
    }
    // console.log('route.params',route.params)
    // console.log('route.params.paramtrip.activityType',route.params.paramtrip.activityType)
  };

  useEffect(getTripFromRouteParams, []);
  // setpoints upon question being answered....based on question type
  const [points, setPoints] = useState(0);

  console.log(
    `
    isCorrectTransportMode -------------${isCorrectTransportMode}
    selectedMode------------------${selectedMode}
    questionNumber------------------${questionNumber}
    points------------------${points}

    extractModeofTransport------------------${extractModeofTransport(
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
    setAnswers({...answers,activityType: selectedMode})
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
    const obj = { ...answers };
    obj[key] = value;
    setAnswers(obj);
    setPoints(allocatePoints(obj));
    // setPoints(allocatePoints(answers));
  };

  const sendAnswersToFirebase = () => {
    setSavingLoader(true);
    ChecktoFeed()
      .then(() => GetFeedsForBadges())
      .then((updatedUser) => {
        setSavingLoader(false);
        navigation.dispatch(
          StackActions.replace('Main', {
            checkIfBadgeWon: isItFreshFeedback,
            user: updatedUser,
          }),
        );
        // setIsItFreshFeedback(false);
      });
  };

  const ChecktoFeed = () => {
    // checks to see if feedback was given already or its fresh feedback
    return firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .doc(route.params.paramKey)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.data());
        // setgiven(querySnapshot.data().feedGiven);

        if (querySnapshot.data().feedGiven == true) {
          Update();
        } else {
          AddFeedtoFireStore();
          // AddFeedtoFireStore();
        }
      });
  };
  const AddFeedtoFireStore = () => {
    setIsItFreshFeedback(true);
    // console.log('AddFeedtoFireStore', route.params.paramKey);
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .doc(route.params.paramKey)
      .update({
        feed1: answers.feed1,
        feed2: answers.feed2,
        feed3: answers.feed3,
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
            totalfeedBacks: firebase.firestore.FieldValue.increment(1),
            // totalFeeds === total points obtained from giving feedback
            totalFeeds: firebase.firestore.FieldValue.increment(points),
          });
      });
  };

  const Update = () => {
    setIsItFreshFeedback(true);
    // console.log('awawa');
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('trips')
      .doc(route.params.paramKey)
      .update({
        feed1: answers.feed1,
        feed2: answers.feed2,
        feed3: answers.feed3,
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
              // totalFeeds === total points obtained from giving feedback
              totalFeeds: firebase.firestore.FieldValue.increment(1),
            });
        }
      });
  };

  const GetFeedsForBadges = () => {
    return firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data();
        // console.log('TotalFeedBacks in here---------', data.totalfeedBacks); // data is containing totalfeedBacks!!!!!!!!!!   <<<<<
        return data;
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

      <LoadingFullScreen
        visible={savingLoader}
        text="Saving your valuable feedback"
      />

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
