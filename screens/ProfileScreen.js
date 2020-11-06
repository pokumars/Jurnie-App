import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';

const ProfileScreen = ({navigation}) => {
  const Sign_out = () => {
    auth()
      .signOut()
      .then(
        () => console.log('User signed out!'),
        navigation.dispatch(StackActions.replace('Login')),
      );
  };

  return (
    <View style={styles.main}>
      <Text>ProfileScreen,,{auth().currentUser.email}</Text>
      <Button title="Sign-out" onPress={() => Sign_out()} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
