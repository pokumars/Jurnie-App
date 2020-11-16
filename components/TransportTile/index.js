import React from 'react';
import { StyleSheet, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { GLOBAL_STYLE } from 'app-constants';

/**
 *
 * @param {string} props.backgroundColor - color hex code that define the background color of the tile
 * for example "#000"
 * @param {number} props.size - height and width of the tile
 * @param {number} props.source - static image source that goes directly into FastImage
 * must be require('../../logo.png')
 *
 */

const TransportTile = (props) => {
  const { backgroundColor, size = 42, source } = props;
  const iconSize = (size * 5) / 6;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor, width: size, height: size },
        GLOBAL_STYLE.CENTER,
      ]}>
      <FastImage
        {...{ source }}
        style={{ width: iconSize, height: iconSize }}
      />
    </View>
  );
};

const BORDER_RADIUS = 4;

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
  },
});

export default TransportTile;
