/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MainTabScreen from './screens/MainTabScreen';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import SplashLoader from './Register_Login/Splash';
import {createStackNavigator} from '@react-navigation/stack';
import login from './Register_Login/Login';
import register from './Register_Login/Register';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashLoader} />
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Register" component={register} />
        <Stack.Screen name="Main" component={MainTabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
