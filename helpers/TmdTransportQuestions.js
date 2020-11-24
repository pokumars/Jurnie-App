import { answerTypes } from "./TmdTransportModes";


const onTimeQuestion = {
  question: 'Was it on time?',
  responseType: answerTypes.booleanUnsure,
};

const askForComments = {
  question: 'Do you have any comments you would like to add?',
  responseType: answerTypes.text,
};
const wearingMasksQuestion = {
  question: 'Were most passengers wearing masks?',
  responseType: answerTypes.booleanUnsure,
};

const feelSafeQuestion = {
  question: 'Did you feel safe as a passenger?',
  responseType: answerTypes.booleanUnsure,
};

export const bikeQuestions = [];
export const busQuestions = [ onTimeQuestion, wearingMasksQuestion, feelSafeQuestion, askForComments];
export const trainQuestions = [];