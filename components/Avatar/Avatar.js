import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { RoyalBlue } from 'components/Colors';

/**
 *
 * @param {number} prop.size - the width and height of the avatar
 * @param {string} prop.source - the remote source of the avatar image
 * must be {uri: 'https://smth.dev/logo.png'}
 *
 */

const Avatar = ({ size, source, style = null }) => (
  <FastImage
    {...{ source }}
    style={[
      { width: size, height: size, borderRadius: size / 2 },
      styles.image,
      { ...style },
    ]}
  />
);

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: RoyalBlue,
  },
});

export default Avatar;
