import React from 'react';
import { StyleSheet, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { GLOBAL_STYLE } from 'app-constants';
import { Black } from 'components/Colors';
import { InlineL } from 'components/Spacing';

/**
 *
 * @param {string} props.backgroundColor - color hex code that define the background color of the tile
 * for example "#000"
 * @param {number} props.height - height of the tile
 * @param {number} props.source - static image source that goes directly into FastImage
 * @param {string} props.tintColor - color hex code that define the color of the icon in the tile
 * @param {number} props.width - width of the tile
 * must be require('../../logo.png')
 *
 */

const TransportTile = (props) => {
  const {
    backgroundColor,
    height = InlineL,
    source,
    style,
    tintColor = Black,
    width = InlineL,
  } = props;
  const iconSize = (Math.min(height, width) * 5) / 6;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor, height, width },
        GLOBAL_STYLE.CENTER,
        style,
      ]}>
      <FastImage
        {...{ source, tintColor }}
        style={{ width: iconSize, height: iconSize }}
      />
    </View>
  );
};

const BORDER_RADIUS = 4;

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    minWidth: InlineL,
  },
});

export default TransportTile;
