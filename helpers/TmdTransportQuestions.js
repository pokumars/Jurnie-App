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
const imageQuestion = {
  question: 'Would you like to post an image as part of yor feedback',
  responseType: answerTypes.mediaPhoto,
};
const rateTripQuestion = {
  question: 'How would you rate the trip?',
  responseType: answerTypes.emojiRating,
};

const thankYou = {
  question: 'Thank you for the feedback',
  responseType: answerTypes.thankYou,
};


/* The questionnaire has been structiured so that the question 5 i.e after feed4  is the one that asks for image.
 Then after that comes the thank you. So keep the structure */
export const bikeQuestions = [];
export const busQuestions = [ onTimeQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];
export const trainQuestions = [];