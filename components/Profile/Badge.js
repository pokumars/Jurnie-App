import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import color from '../../constants/color';

/**
 *
 * @param {number|string} prop.multiple How many times has auser won the badge
 * @param {string} prop.badgeImage - image that goes directly into react native's Image source
 * either require('../../logo.png') or {uri: 'https://smth.dev/logo.png'}
 *
 */
const Badge = ({multiple, badgeImage}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.badgeImage} source={badgeImage} />
      <View style={styles.badgeMultipleContainer}>
        <Text style={styles.badgeMultipleText}>
          {multiple ? `x${multiple}` : 'x1'}
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    maxHeight: 100,
    maxWidth: 100,
    marginHorizontal: 20,
    marginTop: 10,
  },
  badgeImage: {
    width: 50,
    height: 50,
  },
  badgeMultipleText: {
    fontSize: 12,
    color: color.SaffronMango,
    padding: 5,
  },
  badgeMultipleContainer: {
    position: 'absolute',
    bottom: 1,
    right: -15,
    backgroundColor: color.BLACK,
    borderRadius: 15,
  },
});

// make this component available to the app
export default Badge;
