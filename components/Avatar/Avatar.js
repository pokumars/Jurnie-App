import React from 'react';
import Image from 'react-native';
import FastImage from 'react-native-fast-image';

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
    style={{ width: size, height: size, borderRadius: size / 2, ...style }}
  />
);

export default Avatar;
