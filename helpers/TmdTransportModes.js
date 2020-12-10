export const transportModes = [
  'motorized/air/plane',
  'motorized/road/bus',
  'motorized/rail/tram',
  'motorized/rail/train',
  'motorized/rail/metro',
  'non-motorized/bicycle',
  'non-motorized/pedestrian/walk',
  'non-motorized/pedestrian/run',
  'motorized/road/car',
];

/* if the activityType received is any of these uncertainTransportModeTypes,
the user has to choose a proper/correct transport mode before they can proceed 
with the questionnaire */
export const uncertainTransportModeTypes = [
  'unknown',
  'non-motorized',
  'motorized',
  'motorized/road',
  'motorized/rail',
];


export const answerTypes = {
  rating: 'RATING',
  booleanUnsure: 'BOOLEAN_UNSURE',
  text: 'TEXT',
  dropdown: 'DROPDOWN',
  emojiRating: 'EMOJI_RATING',
  mediaPhoto: 'MEDIA_PHOTO',
  thankYou: 'THANK_YOU',
};
export const ABORT = 'ABORT';
export const PROCEED = 'PROCEED';

export const exampleTripObject = {
  activityType: 'motorized/air/plane',
  co2: 0,
  dateAdded: 'November 22, 2020 at 7:20:19 PM UTC+2',
  destination: '',
  distance: 2.1,
  duration: '28m47s',
  feed1: '',
  feed2: '',
  feed3: '',
  feed4: '',
  feedGiven: false,
  id: '2',
  img1: '',
  img2: '',
  img3: '',
  img4: '',
  origin: '',
  polyline: '{gnnJmgkwCC@',
  speed: 37,
  timeEnd: '16:16',
  timestart: '15:47',
};

/**
 *
 * @param {string} mode it takes this kind of string 'motorized/road/car' and returns 'car'.
 * If there are no / it returns the word e.g stationary returns just stationary.
 */
export const extractModeofTransport = (mode) => {
  return mode.split('/').pop();
};

/**
 *
 * @param {string} mode it takes this kind of string 'motorized/road/car' and returns 'Car'.
 * If there are no / it returns the word e.g stationary returns just Stationary
 */
export const capitaliseModeofTransport = (mode) => {
  return extractModeofTransport(mode).replace(/^\w/, (m) => m.toUpperCase());
};
