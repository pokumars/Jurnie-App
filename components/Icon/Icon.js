import React from 'react';

import FastImage from 'react-native-fast-image';

const Icon = ({ size, source, tintColor }) => (
  <FastImage
    style={{ width: size.width, height: size.height }}
    {...{ source, tintColor }}
  />
);

export default Icon;
