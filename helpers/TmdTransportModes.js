export const transportModes = [
  'non-motorized/bicycle', 'non-motorized/pedestrian/walk', 
'non-motorized/pedestrian/run', 'motorized/road/car',
'motorized/road/bus', 'motorized/rail/tram', 'motorized/rail/train',
 'motorized/rail/metro', 'motorized/air/plane'
]
export const answerTypes = {
  rating: 'RATING',
  booleanUnsure: 'BOOLEAN_UNSURE',
  text: 'TEXT',
  dropdown: 'DROPDOWN',
  emojiRating: 'EMOJI_RATING'
};
export const ABORT = 'ABORT';
export const PROCEED = 'PROCEED';

export const exampleTripObject = {
  activityType: 'motorized/road/car',
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
  speed: 0.0000012154339272753793,
  timeEnd: '16:16',
  timestart: '15:47',
};

export const capitaliseModeofTransport = (mode) => {
  return mode
    .split('/')
    .pop()
    .replace(/^\w/, (m) => m.toUpperCase());
};