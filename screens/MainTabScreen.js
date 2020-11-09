import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import MyTripsScreen from './MyTripsScreen';
import LeaderboardScreen from './LeaderboardScreen';
import ProfileScreen from './ProfileScreen';

import { COLOR, NAVIGATION_ROUTE } from '../constants';
import CustomizedTabBar from '../components/TabBar';

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_ROUTE.HOME}
      tabBar={props => <CustomizedTabBar {...props} />}
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

export default MainTabScreen;
