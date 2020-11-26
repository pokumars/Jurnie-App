import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from 'components/TabBar';
import HomeScreen from './HomeScreen';
import LeaderboardScreen from './LeaderboardScreen';
import MyTripsScreen from './MyTripsScreen';
import ProfileScreen from './ProfileScreen';

import { COLOR, NAVIGATION_ROUTE } from '../constants';
import MapViewOfTrip from './MapViewOfTrip';

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_ROUTE.HOME}
      tabBar={(props) => <TabBar {...props} />}
      tabBarOptions={{
        activeTintColor: COLOR.STEEL_BLUE,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name={NAVIGATION_ROUTE.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: NAVIGATION_ROUTE.HOME,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTE.MY_TRIPS}
        component={MyTripsScreen}
        options={{
          tabBarLabel: NAVIGATION_ROUTE.MY_TRIPS,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTE.LEADERBOARD}
        component={LeaderboardScreen}
        options={{
          tabBarLabel: NAVIGATION_ROUTE.LEADERBOARD,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTE.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: NAVIGATION_ROUTE.PROFILE,
        }}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTE.MAP}
        component={MapViewOfTrip}
        options={{
          tabBarLabel: NAVIGATION_ROUTE.MAP,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 24,
    height: 24,
  },
});

export default MainTabScreen;
