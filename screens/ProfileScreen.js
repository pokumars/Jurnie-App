/* eslint-disable prettier/prettier */
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';

import Badge from '../components/Profile/Badge';
import IconTextBorderlessBtn from '../components/Profile/IconTextBorderlessBtn';
import ProfileUserDetail from '../components/Profile/ProfileUserDetail';
import {StackActions} from '@react-navigation/native';
import TitleText from '../components/TitleText';
import auth from '@react-native-firebase/auth';
import color from '../constants/color';
import DetailUpdateModal from '../components/Profile/DetailUpdateModal';
import ProfilePicChanger from '../components/ProfilePicChanger';
import globalStyles from '../constants/globalStyle';

const ProfileScreen = ({navigation}) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [username, setUsername] = useState(auth().currentUser.displayName);
  const [changingPicModalVisible, setChangingPicModalVisible] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(auth().currentUser.photoURL)

  //TODO: if a user has a profile pic, use that else use the profile icon
 
  const profilePicPlaceholderTruth = false;
  const signOut = () => {
    auth()
      .signOut()
      .then(
        () => console.log('User signed out!'),
        navigation.dispatch(StackActions.replace('Login')),
      );
    console.log('Sign_out clicked');
  };

  const updateUsername = (newUsername) => {
    console.log('ProfileScreen received this', newUsername);
    return auth()
      .currentUser.updateProfile({displayName: newUsername})
      .then((data) => {
        console.log('confirmation from Firebase');
        setUsername(newUsername);
      });
  };
  const renderNewProfilePic = (newPicUrl) => {
    console.log('setNewProfilePic---------',newPicUrl);
    setProfilePicUrl(newPicUrl);
  }
  const getOldProfileImageRef= () => {
    console.log('profilePicUrl---------', profilePicUrl)
    // Todo: change test%2F to profilePics%2F . Also remember to remove test from storageRef in file helpers\firebaseStorage.js in 2 places there
    console.log('attempt at ref--------------', profilePicUrl.split('?').shift().split('profilePics%2F').pop())
    
    //to delete the old profile pic, we must get the ref from the url.
    if(profilePicUrl!== null ){
      return profilePicUrl.split('?').shift().split('profilePics%2F').pop()
    }
    return ""
  }

  /*
  User info for provider:  {"displayName": null, "email": "a9@gmail.com", "emailVerified": false,
 "isAnonymous": false, "metadata": {"creationTime": 1604699395003, "lastSignInTime": 1604925930815},
 "phoneNumber": null, "photoURL": null, "providerData": [[Object]], "providerId": "firebase",
 "uid": "OosmsPd3HNeADBvUG5lJaMhCbd82"} */
 // TODO: the ios parts of the image adding https://github.com/react-native-image-picker/react-native-image-picker#install
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.settingsLogoutContainer}>
          <IconTextBorderlessBtn
            textFirst={false}
            btnText="Settings"
            btnImage={require('../assets/icons/settings-outline.png')}
            onPress={() => console.log('settings clicked')}
          />
          <IconTextBorderlessBtn
            textFirst={true}
            btnText="Logout"
            btnImage={require('../assets/icons/log-out.png')}
            onPress={() => signOut()}
          />
        </View>
        <ProfilePicChanger
          visible={changingPicModalVisible}
          toggleVisibility={()=>setChangingPicModalVisible(false)}
          update={renderNewProfilePic}
          oldProfileImageRef={getOldProfileImageRef()}
        />
       
        <View style={globalStyles.profilePicContainer}>
          <View style={globalStyles.profilePicView}>
            <Image
              style={globalStyles.profilePic}
              source={
                profilePicUrl
                  ? {uri: profilePicUrl}
                  : require('../assets/icons/profile.png')
              }
            />
          </View>
          <Button
            onPress={() => setChangingPicModalVisible(true)}
            title="Change Pic"
            color={color.STEEL_BLUE}
            accessibilityLabel="Change profile picture"
          />
        </View>
        <View style={styles.userDetails}>
          <ProfileUserDetail
            title="Username"
            onPress={() => setDetailModalVisible(true)}
            detail={username}
            changeable={true}
          />
          <ProfileUserDetail title="Email" detail={auth().currentUser.email} />
          <DetailUpdateModal
            modalVisible={detailModalVisible}
            toggleDetailModal={() => setDetailModalVisible(false)}
            originalDetail={auth().currentUser.displayName}
            onConfirm={updateUsername}
          />
          <Button
            onPress={() => console.log('update details clicked')}
            title="change username or password"
            color={color.USERNAME_BLUE}
            accessibilityLabel="Change username or password"
          />
        </View>
        <View style={styles.badgesAchievementsContainer}>
          <TitleText>Badges &amp; Achievements</TitleText>
          <View style={styles.badgesContainer}>
            <Badge
              multiple={31}
              badgeImage={require('../assets/icons/log-out.png')}
            />
            <Badge
              multiple={3}
              badgeImage={require('../assets/icons/home.png')}
            />
            <Badge
              multiple={125}
              badgeImage={require('../assets/icons/profile.png')}
            />
            <Badge
              badgeImage={require('../assets/icons/settings-outline.png')}
            />
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
};
// TODO: clicking on profile picture lets you view it

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
    justifyContent: 'space-between',

    padding: 5,
  },
  profilePicView: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: color.STEEL_BLUE,
    overflow: 'hidden',
    marginVertical: 5,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  
  userDetails: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgesAchievementsContainer: {
    paddingTop: 25,
    alignItems: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default ProfileScreen;
