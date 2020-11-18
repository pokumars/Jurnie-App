/* eslint-disable prettier/prettier */
//import libraries
import React from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Alert, Button} from 'react-native';
import color from '../../constants/color';

/**
 *
 * @param {string} prop.toggleDetailModal function that toggles visible or invisible
 * @param {string} prop.modalVisible Actual Boolean being toggled in parent
 * @param {string} prop.originalDetail the original detail (username)
 * @param {Boolean} prop.onConfirm what to do when the user clicks save
 *
 */
// create a component
const DetailUpdateModal = ({toggleDetailModal, modalVisible, originalDetail, onConfirm}) => {
  const [detail, setDetail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const legalChars = /^[a-zA-Z0-9_-]*$/; // allow letters, numbers, and underscores

  const updateUserDetails = () => {
    if (detail.length < 5) {
      setErrorMessage('The username must be longer than 5 characters');
      return;
    } else if (!legalChars.test(detail)){
      setErrorMessage('The username can only contain letters, numbers and underscores');
      return;
    } else if (originalDetail === detail){
      setErrorMessage('');
      setDetail('');
      toggleDetailModal();
      console.log('username unchanged ');
      return;
    }

    //if all is good
    onConfirm(detail);
    setDetail('');
    toggleDetailModal();
    console.log('new username is ', detail);
  };
  const cancelChange = () => {
    toggleDetailModal();
    setDetail('');
  };

return (
  <Modal
    animationType="slide"
    visible={modalVisible}
    presentationStyle="fullScreen"
    onRequestClose={() => {
      toggleDetailModal();
      Alert.alert('Username change aborted');
    }}
  >
    <View style={styles.container}>
      <Text style={styles.errorMessage} >{errorMessage}</Text>
      <TextInput style={styles.input}
        onChangeText={(text) => setDetail(text)}
        placeholder="username"
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button
            title="save"
            color={color.USERNAME_BLUE}
            onPress={updateUserDetails}
          />
        </View>
        <View style={styles.button}>
          <Button
            style={styles.button}
            title="cancel"
            color={color.ERR_RED}
            onPress={cancelChange}
          />
        </View>

      </View>
    </View>
  </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    height: 50,
    borderBottomColor: 'grey',
    marginVertical: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: color.ERR_RED,
    marginHorizontal: 5,
  },
});

//make this component available to the app
export default DetailUpdateModal;
