/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { Button, Image, ScrollView, StyleSheet, View } from 'react-native';

import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components/native';
import { StackActions } from '@react-navigation/native';

import TmdApi from 'bridge/TmdApi';

import Badge from 'components/Badge';
import { Mariner, SteelBlue } from 'components/Colors';
import {
  Center,
  InlineXXXL,
  StackXS,
  StackS,
  StackM,
} from 'components/Spacing';
import { TextM } from 'components/Text';
import actions from 'redux-core/actions';
import BadgeWonModal from '../../components/BadgeWonModal';


import DetailUpdateModal from './components/DetailUpdateModal';
import IconTextBorderlessBtn from './components/IconTextBorderlessBtn';
import ProfilePicturePickerModal from './components/ProfilePicturePickerModal';
import ProfileUserDetail from './components/ProfileUserDetail';

const ProfileScreen = ({
  route,
  navigation,
  profilePictureUrl,
  setProfilePictureUrl,
}) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [username, setUsername] = useState(auth().currentUser.displayName);
  const [changingPicModalVisible, setChangingPicModalVisible] = useState(false);
  const [badgeWonModalVisible, setBadgeWonModalVisible] = useState(null);
  const badgeThatUserJustWon = route.params ? route.params.badgeToShow : null;
  const [myBadgesInFirebase, setMyBadgesInFirebase] = useState([]);

  const toggleBadgeWonModal = (onOff) => {
    setBadgeWonModalVisible(onOff);
  };
  console.log('myBadgesInFirebase   ', myBadgesInFirebase);
  console.log('badgeThatUserJustWon   ', badgeThatUserJustWon);
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('badges')
      .where('gotten', '==', true)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setMyBadgesInFirebase(data);
        // console.log(myBadgesInFirebase);
      });
    if (route.params !== undefined && route.params.showBadge === true) {
      setBadgeWonModalVisible(route.params.showBadge);
    }
  }, []);
  const fetchProfilePicAtFirstLogin =() => {
    /* the first time a user installs and lofs in, the profile pic doesnt load
    This is a fallback for that scenario */
    if (profilePictureUrl === null|| profilePictureUrl=== ''){
      const fetchedUrl = auth().currentUser ? auth().currentUser.photoURL || '' : ''
      setProfilePictureUrl(fetchedUrl);
    }
  }
  useEffect(fetchProfilePicAtFirstLogin,[])

  /* useEffect(() => {
    // if the user is coming from having completed a survey, check whether they just won some badge
    console.log('-------------route in profileScreen', route);
    if (route.params !== undefined && route.params.showBadge === true) {
      console.log(
        '--------------------display badge won in profile---------------------',
      );
      setBadgeWonModalVisible(true);
    }
  }, [route.params]); */

  const signOut = () => {
    auth()
      .signOut()
      .then(
        () => console.log('User signed out!'),
        TmdApi.stopTmdService(),
        navigation.dispatch(StackActions.replace('Login')),
      );
  };

  const updateUsername = (newUsername) => {
    console.log('ProfileScreen received this', newUsername);
    return auth()
      .currentUser.updateProfile({ displayName: newUsername })
      .then((data) => {
        // confirmation from Firebase
        firestore().collection('users').doc(auth().currentUser.email).update({
          userName: newUsername,
        });
        setUsername(newUsername);
      });
  };
  const renderNewProfilePic = (newPicUrl) => {
    // when user changes profilepic, set the new profile pic immediately
    console.log('setNewProfilePic---------', newPicUrl);
    setProfilePictureUrl(newPicUrl);
  };
  const getOldProfileImageRef = () => {
    if (profilePictureUrl !== null) {
      // to delete the old profile pic, we must get the ref from the url.
      // ref extracted from the profilePictureUrl-------------- is profilePictureUrl.split('?').shift().split('profilePics%2F').pop(),
      return profilePictureUrl.split('?').shift().split('profilePics%2F').pop();
    }
    console.log('profilePictureUrl--------- was null');
    return '';
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.settingsLogoutContainer}>
          {false && (
            <IconTextBorderlessBtn
              textFirst={false}
              btnText="Settings"
              btnImage={require('assets/icons/settings-outline.png')}
              onPress={() => console.log('settings clicked')}
            />
          )}
          <IconTextBorderlessBtn
            textFirst
            btnText="Logout"
            btnImage={require('assets/icons/log-out.png')}
            onPress={signOut}
          />
        </View>
        <ProfilePicturePickerModal
          visible={changingPicModalVisible}
          toggleVisibility={() => setChangingPicModalVisible(false)}
          update={renderNewProfilePic}
          oldProfileImageRef={getOldProfileImageRef()}
        />

        <ProfilePictureWrapper>
          <ProfilePictureContainer>
            <Image
              style={styles.profilePic}
              source={
                profilePictureUrl
                  ? { uri: profilePictureUrl }
                  : require('assets/icons/profile.png')
              }
            />
          </ProfilePictureContainer>
          <Button
            onPress={() => setChangingPicModalVisible(true)}
            title="Change Pic"
            color={SteelBlue}
            accessibilityLabel="Change profile picture"
          />
        </ProfilePictureWrapper>
        {badgeThatUserJustWon && (
          <BadgeWonModal
            visible={badgeWonModalVisible}
            text={badgeThatUserJustWon.text}
            setVisibility={toggleBadgeWonModal}
            badgeImage={badgeThatUserJustWon.badgeImage}
          />
        )}
        <View style={styles.userDetails}>
          <ProfileUserDetail
            title="Username"
            onPress={() => setDetailModalVisible(true)}
            detail={username}
            changeable
          />
          <ProfileUserDetail title="Email" detail={auth().currentUser.email} />
          <DetailUpdateModal
            modalVisible={detailModalVisible}
            toggleDetailModal={() => setDetailModalVisible(false)}
            originalDetail={auth().currentUser.displayName}
            onConfirm={updateUsername}
          />
        </View>
        <AchievementsContainer>
          <TitleText>Badges &amp; Achievements</TitleText>
          <BadgesContainer
            style={{
              justifyContent:
                myBadgesInFirebase.length <= 5 ? 'space-between' : 'flex-start',
            }}>
            {myBadgesInFirebase.map((badge) => (
              <Badge
                badgeImage={badge.badgeImage}
                isReachievable={badge.isReachievable}
                key={badge.name}
                badgeName={badge.name}
                numberOfTheSameBadge={badge.numberOfBadge}
              />
            ))}
          </BadgesContainer>
        </AchievementsContainer>
      </ScrollView>
    </View>
  );
};
// TODO: clicking on profile picture lets you view

const ProfilePictureWrapper = styled.View`
  ${Center};
`;

const ProfilePictureContainer = styled.View`
  border-radius: ${InlineXXXL / 2}px;
  border: 3px solid ${Mariner};
  height: ${InlineXXXL}px;
  margin-bottom: ${StackS}px;
  margin-top: ${StackS}px;
  overflow: hidden;
  width: ${InlineXXXL}px;
`;

const AchievementsContainer = styled.View`
  align-items: center;
  padding-top: ${StackM}px;
`;

const TitleText = styled.Text`
  font-size: ${TextM}px;
  margin-bottom: ${StackS}px;
`;

const BadgesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${StackXS}px;
`;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsLogoutContainer: {
    flexDirection: 'row',
    width: '100%',
    // justifyContent: 'space-between', //uncomment this when we have settings
    justifyContent: 'flex-end', // remove this when we have settings
    padding: 5,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  userDetails: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(
  (state) => ({
    profilePictureUrl: state.profilePictureReducer.profilePictureUrl,
  }),
  { setProfilePictureUrl: actions.setProfilePictureUrl },
)(ProfileScreen);
