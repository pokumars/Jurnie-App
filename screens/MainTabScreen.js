import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from 'components/TabBar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import HomeScreen from './HomeScreen';
import LeaderboardScreen from './LeaderboardScreen';
import MyTripsScreen from './MyTripsScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';

import { COLOR, NAVIGATION_ROUTE } from '../constants';
import { feedbackAmountMilestones } from '../helpers/badgeWinning';

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ route, navigation }) => {
  /* when survey is done, check if they won something.  If they did, pass the congratulatory message and image uri
  of what they won to profile screen and let it display a modal */

  useEffect(() => {
    // if the user is coming from having completed a survey, check whether they just won some badge
    if (route.params !== undefined && route.params.checkIfBadgeWon === true) {
      console.log('-----MainTabScreen route params---------------------', route.params);

      // this has the text of the badge and the image
      /* NB: we need the +1 because the previous state of userObj is what is passed to MainTabScreen
      so if it is fresh feedback, checkIfBadgeWon will be true and that is when we check whether they won something */
      const userJustWonThisBadge = feedbackAmountMilestones.find((badgeObj) => {
        return badgeObj.score === route.params.user.totalfeedBacks + 1;
      });

      if (userJustWonThisBadge) {
        // pass with the params, the badgename, the badge popup-modal text

        firestore()
          .collection('users')
          .doc(auth().currentUser.email)
          .collection('badges')
          .doc(userJustWonThisBadge.name)
          .set({
            name: userJustWonThisBadge.name,
            gotten: true,
            score: userJustWonThisBadge.score,
            badgeImage: userJustWonThisBadge.badgeImage,
          })
          .then((result) => {
            console.log(result);
            // go to profile page and show them the modal that says they just won something
            navigation.navigate(NAVIGATION_ROUTE.PROFILE, {
              showBadge: true,
              badgeToShow: userJustWonThisBadge,
            });
          });
      }
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
