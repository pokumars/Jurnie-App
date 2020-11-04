import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';

import HomeScreen from './HomeScreen';
import MyTripsScreen from './MyTripsScreen';
import LeaderboardScreen from './LeaderboardScreen';
import ProfileScreen from './ProfileScreen';

import { COLOR, NAVIGATION_ROUTE } from '../constants';

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_ROUTE.HOME}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let imageSource;

          switch (route.name) {
            case NAVIGATION_ROUTE.HOME:
              imageSource = focused ? require('../assets/icons/homeActive.png') : require('../assets/icons/home.png')
              break;
            case NAVIGATION_ROUTE.MY_TRIPS:
              imageSource = focused ? require('../assets/icons/myTripsActive.png') : require('../assets/icons/myTrips.png')
              break;
            case NAVIGATION_ROUTE.LEADERBOARD:
              imageSource = focused ? require('../assets/icons/leaderboardActive.png') : require('../assets/icons/leaderboard.png')
              break;
            case NAVIGATION_ROUTE.PROFILE:
              imageSource = focused ? require('../assets/icons/profileActive.png') : require('../assets/icons/profile.png')
              break;
            default:
              imageSource = null;
          }
          return (
            <Image
              source={imageSource}
              style={styles.tabBarIcon}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: COLOR.STEEL_BLUE,
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
      <Tab.Screen
        name={NAVIGATION_ROUTE.MY_TRIPS}
        component={MyTripsScreen}
        options={{
          tabBarLabel: NAVIGATION_ROUTE.MY_TRIPS
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTE.LEADERBOARD}
        component={LeaderboardScreen}
        options={{
          tabBarLabel: NAVIGATION_ROUTE.LEADERBOARD
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTE.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: NAVIGATION_ROUTE.PROFILE
        }}
      />
    </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 24,
    height: 24,
  }
})

export default MainTabScreen;
