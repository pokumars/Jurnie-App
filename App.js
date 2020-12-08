/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { initStore } from 'redux-core';

import SplashLoader from './Register_Login/Splash';
import MainTabScreen from './screens/MainTabScreen';
import DetailedScreen from './screens/DEtailedTripScreen';
import login from './Register_Login/Login';
import register from './Register_Login/Register';
import Questionnaire from './screens/QuestionnaireScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={initStore()}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashLoader} />
          <Stack.Screen name="Questionnaire" component={Questionnaire} />
          <Stack.Screen name="Login" component={login} />
          <Stack.Screen name="Register" component={register} />
          <Stack.Screen name="Main" component={MainTabScreen} />
          <Stack.Screen name="Detailed" component={DetailedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
