import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DefaultCard } from '../components/Cards/Cards';
import { BoldText, TextXS } from '../components/Text/Text';
import color from '../constants/color';
import globalStyle from '../constants/globalStyle';
import { Picker } from '@react-native-picker/picker';
import { transportModes, answerTypes, ABORT, PROCEED, exampleTripObject, capitaliseModeofTransport } from '../helpers/TmdTransportModes';
import QuestionModal from '../components/QuestionModal';
import { StackActions } from '@react-navigation/native';


const Questionnaire = ({ navigation }) => {
  /* if feedGiven is false, then isCorrectTransportMode should be null. Because
  user cant proceed to give feedback until they have answered isCorrectTransportMode.
  This condition is so that if user clicks yes/no but then  aborts feedback altogether,
  the next time they come back, isCorrectTransportMode will be null so that they get the
  chance to choose the correct one */ // TODO: the above
  const [isCorrectTransportMode, setIsCorrectTransportMode] = useState(null);
  const [selectedMode, setSelectedMode] = useState(exampleTripObject.activityType);
  const [questionNumber, setQuestionNumber] = useState(null);
 
  //after each question is done, the answer is set. Pass in things like id, origin and polyline as props when the user clicks on the questionnaire
  const [answers, setAnswers] = useState({ feedGiven: false, activityType: selectedMode });

  console.log(`
    isCorrectTransportMode -------------${isCorrectTransportMode}
    selectedMode------------------${selectedMode}
    questionNumber------------------${questionNumber}
    received answers------------------`, answers
  );

  // activityTypeString is required. pass it as props or as part of the passed in trip object
  const activityTypeString = capitaliseModeofTransport(selectedMode);
  const correctTransportModeHandler = () => {
    setIsCorrectTransportMode(true);
    setQuestionNumber(0);
  };

  const nextModalAction = (abortOrProceed) => {
    if (abortOrProceed=== ABORT){setQuestionNumber(null)}
    if (abortOrProceed=== PROCEED){setQuestionNumber(() => setQuestionNumber(questionNumber + 1))}
  };

  const appendAnswer = (key, value) => {
    // console.log('append answers -------------key', key);
    // console.log('append answers -------------value', value);
    const obj = { ...answers };
    obj[key] = value;
    setAnswers(obj);
  };

  const sendAnswersToFirebase = () => {
    console.log('------------ we are ready to sendAnswer to firebase-------------', answers);
    navigation.dispatch(StackActions.popToTop());
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
            onValueChange={(itemValue) => setSelectedMode(itemValue)}>
            {transportModes.map((mode) => {
              return (
                <Picker.Item key={mode} label={capitaliseModeofTransport(mode)} value={mode} />
              );
            })}
          </Picker>
        </>
      )}

    <QuestionModal
        answerType={answerTypes.text}
        question="Do you have any comments you would like to add?"
        visible={questionNumber === 2}
        nextAction={nextModalAction}
        appendAnswer={appendAnswer}
        questionNumber={2}
        
      />

    <QuestionModal
        answerType={answerTypes.mediaPhoto}
        question="Would you like to add an image?"
        visible={questionNumber === 1}
        nextAction={nextModalAction}
        appendAnswer={appendAnswer}
        questionNumber={1}
        
      />
      <QuestionModal
        answerType={answerTypes.emojiRating}
        
        question="How would you rate the trip?"
        visible={questionNumber === 0}
        nextAction={nextModalAction}
        appendAnswer={appendAnswer}
        questionNumber={0}
      />

    <QuestionModal
        answerType={answerTypes.thankYou}
        question="Lorem ipsum"
        visible={questionNumber === 3}
        nextAction={nextModalAction}
        appendAnswer={appendAnswer}
        questionNumber={3}
        sendAnswers={sendAnswersToFirebase}
      />

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
