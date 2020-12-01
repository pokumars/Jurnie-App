/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, View, Modal,Text } from 'react-native';

import auth from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import { StackActions } from '@react-navigation/native';

import TmdApi from 'bridge/TmdApi';

import Badge from 'components/Badge';
import { Mariner, SteelBlue } from 'components/Colors';
import DetailUpdateModal from './components/DetailUpdateModal';
import IconTextBorderlessBtn from './components/IconTextBorderlessBtn';
import ProfilePicturePickerModal from './components/ProfilePicturePickerModal';
import ProfileUserDetail from './components/ProfileUserDetail';
import {
  Center,
  InlineXXXL,
  StackXS,
  StackS,
  StackM,
} from 'components/Spacing';
import { TextM } from 'components/Text';
import BadgeWonModal from '../../components/BadgeWonModal';
import { determineBadgeIcon } from 'helpers/determineAsset';

const testBadgeData = [
  {
    id: 'badge1',
    isReachievable: true,
    numberOfBadge: 12,
    symbol: 'camera',
  },
  {
    id: 'badge2',
    isReachievable: false,
    numberOfBadge: 1,
    symbol: 'medal',
  },
  {
    id: 'badge3',
    isReachievable: true,
    numberOfBadge: 123,
    symbol: 'target',
  },
  {
    id: 'badge4',
    isReachievable: true,
    numberOfBadge: 7908,
    symbol: 'trophy',
  },
  {
    id: 'badge5',
    isReachievable: true,
    numberOfBadge: 7908,
    symbol: 'trophy',
  },
  {
    id: 'badge6',
    isReachievable: true,
    numberOfBadge: 7908,
    symbol: 'trophy',
  },
  {
    id: 'badge7',
    isReachievable: true,
    numberOfBadge: 7908,
    symbol: 'trophy',
  },
];

const ProfileScreen = ({ route, navigation }) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [username, setUsername] = useState(auth().currentUser.displayName);
  const [changingPicModalVisible, setChangingPicModalVisible] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(
    auth().currentUser.photoURL,
  );
  const [badgeWonModalVisible, setBadgeWonModalVisible] = useState(true);

  const toggleBadgeWonModal= (onOff) =>{
    setBadgeWonModalVisible(onOff)
  }

  useEffect(() => {
    // if the user is coming from having completed a survey, check whether they just won some badge
    console.log('-------------route in profileScreen', route);
    if (route.params !==undefined && route.params.showBadge === true) {
      console.log('--------------------display badge won in profile---------------------')
      setBadgeWonModalVisible(true);
    }
  }, [route.params]);

  const signOut = () => {
    auth()
      .signOut()
      .then(
        () => console.log('User signed out!'),
        TmdApi.stopTmdService(),
        navigation.dispatch(StackActions.replace('Login')),
      );
    console.log('Sign_out clicked');
  };

  const updateUsername = (newUsername) => {
    console.log('ProfileScreen received this', newUsername);
    return auth()
      .currentUser.updateProfile({ displayName: newUsername })
      .then((data) => {
        console.log('confirmation from Firebase');
        setUsername(newUsername);
      });
  };
  const renderNewProfilePic = (newPicUrl) => {
    console.log('setNewProfilePic---------', newPicUrl);
    setProfilePicUrl(newPicUrl);
  };
  const getOldProfileImageRef = () => {
    if (profilePicUrl !== null) {
      // to delete the old profile pic, we must get the ref from the url.
      console.log('profilePicUrl---------', profilePicUrl);
      console.log(
        'ref from the profilePicUrl--------------',
        profilePicUrl.split('?').shift().split('profilePics%2F').pop(),
      );
      return profilePicUrl.split('?').shift().split('profilePics%2F').pop();
    }
    console.log('profilePicUrl--------- was null');
    return '';
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.settingsLogoutContainer}>
        
          { false && (<IconTextBorderlessBtn
            textFirst={false}
            btnText="Settings"
            btnImage={require('assets/icons/settings-outline.png')}
            onPress={() => console.log('settings clicked')}
          />)}
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
                profilePicUrl
                  ? { uri: profilePicUrl }
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
        <BadgeWonModal
          visible={badgeWonModalVisible}
          text="a badge for your first feedback"
          setVisibility={toggleBadgeWonModal}
          badgeImage={determineBadgeIcon('trophy')}
        />
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
                testBadgeData.length <= 5 ? 'space-between' : 'flex-start',
            }}>
            {testBadgeData.map((badge) => (
              <Badge
                badgeImage={determineBadgeIcon(badge.symbol)}
                isReachievable={badge.isReachievable}
                key={badge.id}
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
    justifyContent: 'flex-end',  // remove this when we have settings
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

export default ProfileScreen;
