import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import color from '../../constants/color';
/**
 *
 * @param {string} prop.title Title of the detail e.g username
 * @param {string} prop.detail the user detail e.g pokumars
 */
const ProfileUserDetail = ({ title, detail }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{detail}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  title: {
    marginHorizontal: 15,
    fontSize: 12,
    color: color.STEEL_BLUE,
  },
  detailContainer: {
    borderWidth: 1,
    borderColor: color.BLACK,
    backgroundColor: color.Whisper,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 25,
  },
  detailText: {
    fontSize: 18,
    color: color.USERNAME_BLUE,
  },
});

export default ProfileUserDetail;
