import React from 'react';

import FastImage from 'react-native-fast-image';

const Icon = ({ size, source, tintColor }) => (
  <FastImage style={{ width: size, height: size }} {...{ source, tintColor }} />
);

export default Icon;
