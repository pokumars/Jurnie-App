import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import MyTripsScreen from './MyTripsScreen';
import LeaderboardScreen from './LeaderboardScreen';
import ProfileScreen from './ProfileScreen';
import { NAVIGATION_ROUTE } from '../constants';

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_ROUTE.HOME}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name={NAVIGATION_ROUTE.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: NAVIGATION_ROUTE.HOME
        }}
      />
      <Tab.Screen name={NAVIGATION_ROUTE.MY_TRIPS} component={MyTripsScreen} />
      <Tab.Screen name={NAVIGATION_ROUTE.LEADERBOARD} component={LeaderboardScreen} />
      <Tab.Screen name={NAVIGATION_ROUTE.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
    )
};

export default MainTabScreen;
