import React from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { StackS } from './Spacing';
import { TextM } from './Text';

const LoadingFullScreen = ({ visible, text }) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color="#f8a" />
          <TitleText>{text}</TitleText>
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
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default LoadingFullScreen;
