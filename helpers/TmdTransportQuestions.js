import { answerTypes } from "./TmdTransportModes";

export const basicAnswerPoint = 1;
export const imgFeedbackPoint = 2;
// These are the fields in an answer object that are gotten from the feedback
const expectedResponses = ['feed1', 'feed2', 'feed3', 'feed4', 'img1'];
/**
 * 
 * @param {Object} answerObj pass the trip object or the answer object
 * @returns the number of points that the answers deserve
 */
export const allocatePoints = (answerObj) => {
  let points = 0;
  // console.log(points);
  expectedResponses.forEach((element) => {
    if (answerObj[element] != null && answerObj[element].trim().length > 1) {
      if (element.substr(0, 3) === 'img') {
        points += 2;
      } else {
        points += 1;
      }
    }
  });
  console.log('points ---------------', points);
  return points;
};

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

const trafficQuestion = {
  question: 'Was there a lot of traffic?',
  responseType: answerTypes.booleanUnsure,
};

const bikeLanesQuestion= {
  question: 'Is there adequate bike lanes?',
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
 Then after that comes the thank you. So keep the structure
 feed4 should always be the user generated text */
const bikeQuestions = [ bikeLanesQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];

const busQuestions = [ onTimeQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];

const walkQuestions = [ onTimeQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];

const runQuestions = [ onTimeQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];

const carQuestions = [ trafficQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];

const railQuestions = [ onTimeQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];

const tramQuestions = [ onTimeQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];

const trainQuestions = [ onTimeQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];

const metroQuestions = [ onTimeQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];

const planeQuestions = [ onTimeQuestion, rateTripQuestion, askForComments, feelSafeQuestion, imageQuestion, thankYou ];

export const transportModeQuestions = {
  bicycle: bikeQuestions,
  walk: walkQuestions,
  run: runQuestions,
  car: carQuestions,
  bus: busQuestions,
  rail: railQuestions,
  tram: tramQuestions,
  train: trainQuestions,
  metro: metroQuestions,
  plane: planeQuestions,
};
