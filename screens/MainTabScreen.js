import React, { useEffect }  from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from 'components/TabBar';
import HomeScreen from './HomeScreen';
import LeaderboardScreen from './LeaderboardScreen';
import MyTripsScreen from './MyTripsScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';

import { COLOR, NAVIGATION_ROUTE } from '../constants';

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ route, navigation }) => {
  /* when survey is done, check if they won something.  If they did, pass the name and image uri
  of what they won to profile screen and let it display a modal */
  useEffect(() => {
    // if the user is coming from having completed a survey, check whether they just won some badge
    console.log('-------------route in maintabscreen', route);
    if (route.params !==undefined && route.params.checkIfBadgeWon === true) {
      console.log('--------------------display badge won ---------------------')
      // pass in the params, the badgename, the badge image and whether they just won it
      navigation.navigate(NAVIGATION_ROUTE.PROFILE, { showBadge: true });
    }
  }, [route.params]);


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
