import React from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, Modal, Text, Button } from 'react-native';
import { StackS } from './Spacing';
import { TextM } from './Text';
import { InlineXXL, StackXS, StackXXS } from 'components/Spacing';
import FastImage from 'react-native-fast-image';
import { COLOR } from '../constants';

/**
 *
 * @param {Boolean} prop.visible is modal visible
 * @param {string} prop.text - the name of the badge
 * @param {function} prop.setVisibility - function that sets visibility to false (as part of clean-up)
 * @param {string} prop.badgeImage - image that goes directly into react native's Image source
 *
 */
const BadgeWonModal = ({ visible, text, setVisibility, badgeImage }) => {
  console.log('BadgeWonModal ------------badge should be visible now');
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => {
        setVisibility(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TitleText> Congratulations !</TitleText>
          <FastImage source={badgeImage} style={styles.badgeImage} />
          <Text>You have earned {text || 'a badge'}</Text>
          <View style={styles.buttonView}>
          <Button
            title="close"
            color={COLOR.ERR_RED}
            onPress={() => {
              setVisibility(false);
            }}
          />
        </View>
        </View>
      </View>
    </Modal>
  );
};

const TitleText = styled.Text`
  font-size: ${TextM}px;
  margin-bottom: ${StackS}px;
`;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeImage: {
    width: InlineXXL,
    height: InlineXXL,
  },
  buttonView: {
    marginTop: 20,
    width: '30%',
  },
});

export default BadgeWonModal;
