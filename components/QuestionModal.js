import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Button } from 'react-native';
import color from '../constants/color';
import { answerTypes, ABORT, PROCEED } from '../helpers/TmdTransportModes';
import EmojiRatingResponse from './SurveyComponents/EmojiRatingResponse';
import ImageResponse from './SurveyComponents/ImageResponse';
import BooleanUnsureResponse from './SurveyComponents/BooleanUnsureResponse';
import TextResponse from './SurveyComponents/TextResponse';
import ThankYouForFeedback from './SurveyComponents/ThankYouForFeedback';

const QuestionModal = ({
  answerType,
  question,
  visible,
  nextAction,
  questionNumber,
  appendAnswer,
  sendAnswers,
  points
}) => {
  // answered=== true shows btn that says next
  const [answered, setAnswered] = useState(false);
  // the answer we are going to pass to the parent
  const [answer, setAnswer] = useState(null);
  // mediaOrDone tells if we are adding img or we are done. It changes how toNextQuestionHandler executes
  // when we enter a new question, set it. When exiting set to null. It should be null for all except done and image modals
  const [mediaOrDone, setMediaOrDone] = useState(null);
  // console.log('mediaOrDone------------',mediaOrDone)

  const renderResponder = () => {
    switch (answerType) {
      case answerTypes.emojiRating:
        return <EmojiRatingResponse setAnswered={setAnswered} setAnswer={setAnswer} setMediaOrDone={setMediaOrDone} />;
      case answerTypes.mediaPhoto:
        return <ImageResponse setAnswered={setAnswered} setAnswer={setAnswer} setMediaOrDone={setMediaOrDone} />;
      case answerTypes.text:
        return <TextResponse setAnswered={setAnswered} setAnswer={setAnswer} setMediaOrDone={setMediaOrDone}  />;
      case answerTypes.booleanUnsure:
        return <BooleanUnsureResponse setAnswered={setAnswered} setAnswer={setAnswer} setMediaOrDone={setMediaOrDone} />;
      case answerTypes.thankYou:
        // this component triggers the send feedback
        return <ThankYouForFeedback setAnswered={setAnswered} setAnswer={setAnswer} setMediaOrDone={setMediaOrDone} points={points} />;

      default:
        console.error('error in question modal. No question type detected');
        return <Text>error in question modal. No question type detected</Text>;
    }
  };

  const toNextQuestionHandler = () => {
    // appendAnswer takes (keyName,value). It adds it to the tempAnswerObj to be sent to the db
    // if it is the modal where we take pictures, then append answer will be image saving. To be handled later
    if (mediaOrDone === 'done') {

      // if done trigger send answers
      sendAnswers();
      nextAction(ABORT);
    } else if (mediaOrDone === 'photo') {
      // go to next
      nextAction(PROCEED);
      appendAnswer(`img${1}`, answer);
    } else {
      // go to next
      nextAction(PROCEED);
      appendAnswer(`feed${questionNumber + 1}`, answer);
    }

    console.log('next clicked');
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setAnswered(false);
        console.log('Questionnaire Aborted '); // Todo: you can send what they have upon abortion
        nextAction(ABORT);
      }}
      visible={visible}>
      <View style={styles.container}>
        <Text>{question}</Text>
        {renderResponder()}
        <View style={{ alignItems: 'flex-end' }}>
        {
          // only show the next button when user has answered
          answered === true && (
            <View style={styles.buttonView}>
                <Button
                  title={mediaOrDone === 'done' ? 'done' : 'next'}
                  color={color.BLACK}
                  onPress={toNextQuestionHandler}
                />
            </View>
          )
        }
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '5%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
  },
  buttonView: {
    width: '30%',
  },

});

export default QuestionModal;
