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
import React, { useEffect, useState } from 'react';

import LottieView from 'lottie-react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';

const user = auth().currentUser;

const SplashLoader = ({ navigation }) => {
  console.log('User info for provider: ', user);
  useEffect(() => {
    setTimeout(() => {
      if (user === null) {
        navigation.dispatch(StackActions.replace('Login'));
      } else {
        navigation.dispatch(StackActions.replace('Main'));
      }
    }, 2000);
  }, []);

  return (
    <View style={{ alignContent: 'center', alignItems: 'center' }}>
      <Text>Splash Screen wait 2s</Text>
      <LottieView
        style={{
          width: 50,
          height: 50,
        }}
        source={require('../assets/anim.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashLoader;
