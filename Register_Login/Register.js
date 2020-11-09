import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';

const user = auth().currentUser;

function register({navigation}) {
  const [email, setemail] = React.useState('');
  const [pass, setpass] = React.useState('');

  console.log('User info for provider: ', user);

  const Authentication = () => {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log('User account created & signed in!'),
          navigation.dispatch(StackActions.replace('Login'));
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setemail}></TextInput>
      <TextInput
        placeholder="Pass"
        value={pass}
        onChangeText={setpass}></TextInput>
      <Button title="Register" onPress={() => Authentication()} />
      <Text></Text>
      <Button
        title="Move to Login"
        onPress={() => navigation.dispatch(StackActions.replace('Login'))}
      />
    </View>
  );
}

export default register;
