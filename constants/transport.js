const MeansOfTransport = Object.freeze({
  // This will act like an enum
  BUS: 1,
  CAR: 2,
  TRAIN: 3,
  WALK: 4,
});

const nonEssentialModes = [
  'stationary',
  'non-motorized/pedestrian',
  'non-motorized/pedestrian/walk',
  'non-motorized/pedestrian/run',
  'unknown',
  'non-motorized',
];

export { MeansOfTransport as default, nonEssentialModes };
