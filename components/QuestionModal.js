import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import color from '../constants/color';
import globalStyles from '../constants/globalStyle';
import { answerTypes, ABORT, PROCEED } from '../helpers/TmdTransportModes';
import EmojiRatingResponse from './EmojiRatingResponse';

const QuestionModal = ({
  answerType,
  question,
  visible,
  nextAction,
  questionNumber,
  appendAnswer,
}) => {
  // answered=== true shows btn that says next
  const [answered, setAnswered] = useState(false);
  // the answer we are going to pass to the parent
  const [answer, setAnswer] = useState(null);

  const renderResponder = () => {
    switch (answerType) {
      case answerTypes.emojiRating:
        return <EmojiRatingResponse setAnswered={setAnswered} setAnswer={setAnswer} />;
      case answerTypes.text:
        return <TextResponse setAnswered={setAnswered} setAnswer={setAnswer} />;
      case answerTypes.booleanUnsure:
        return <BooleanUnsureResponse setAnswered={setAnswered} setAnswer={setAnswer} />;

      default:
        console.error('error in question modal. No question type detected');
        return <Text>error in question modal. No question type detected</Text>;
    }
  };
  const toNextQuestionHandler = () => {
    // appendAnswer takes (keyName,value). It adds it to the tempAnswerObj to be sent to the db
    // if it is the modal where we take pictures, then append answer will be image saving. To be handled later
    appendAnswer(`feed${questionNumber + 1}`, answer);

    // go to next
    nextAction(PROCEED);
    console.log('next clicked');
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      presentationStyle="formSheet"
      onRequestClose={() => {
        setAnswered(false);
        console.log('Questionnaire Aborted ');
        nextAction(ABORT);
      }}
      visible={visible}>
      <View style={styles.container}>
        <Text>Question: {question}</Text>
        {renderResponder()}
        {
          // only show the next button when user has answered
          answered === true && (
            <View style={styles.buttonView}>
              <Button title="next" color={color.RAJAH} onPress={toNextQuestionHandler} />
            </View>
          )
        }
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
  responderViewContainer: {
    marginTop: 10,
  },
});

const TextResponse = (props) => {
  const [textValue, setTextValue] = useState('');
  const submitText = () => {
    props.setAnswered(true);
    props.setAnswer(textValue);
  };
  return (
    <View style={[styles.responderViewContainer, { alignItems: 'center' }]}>
      <TextInput
        multiline
        numberOfLines={6}
        style={{ borderColor: 'gray', borderWidth: 1 , width: '100%'}}
        onChangeText={(text) => setTextValue(text)}
        value={textValue}
      />
      <View style={[globalStyles.sideBySideButtonView, { marginTop: 15 }]}>
        <Button title="submit" onPress={submitText} />
      </View>
    </View>
  );
};

const BooleanUnsureResponse = (props) => {
  return (
    <View style={styles.responderViewContainer}>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonView}>
          <Button
            title="yes"
            color={color.STEEL_BLUE}
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('yes');
              console.log('yes clicked');
            }}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            title="no"
            color={color.RAJAH}
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('no');
              console.log('no clicked');
            }}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            title="not sure"
            color={color.RAJAH}
            onPress={() => {
              // show btn that says next
              props.setAnswered(true);
              props.setAnswer('not sure');
              console.log('not sure clicked');
            }}
          />
        </View>
      </View>
    </View>
  );
};


export default QuestionModal;
