import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import color from '../../../../constants/color';
import IconTextBorderlessBtn from '../IconTextBorderlessBtn';
/**
 *
 * @param {string} prop.title Title of the detail e.g username
 * @param {string} prop.detail the user detail e.g pokumars
 * @param {Boolean} prop.changeable can the user change that detail
 *
 */
const ProfileUserDetail = ({ title, detail, changeable, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonAndDetail}>
        <View style={styles.detailContainer}>
          <Text ellipsizeMode="tail" style={styles.detailText}>
            {detail}
          </Text>
        </View>
        {changeable && (
          <View style={styles.saveBtn}>
            <IconTextBorderlessBtn
              textFirst={false}
              btnText="Change"
              btnImage={require('assets/icons/edit-pencil.png')}
              onPress={onPress}
            />
          </View>
        )}
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
    flex: 1,
    marginHorizontal: 10,
  },
  detailText: {
    fontSize: 18,
    color: color.USERNAME_BLUE,
  },
  buttonAndDetail: {
    flexDirection: 'row',
    width: '100%',
  },
  saveBtn: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: color.STEEL_BLUE,
    justifyContent: 'center',
  },
});

export default ProfileUserDetail;
