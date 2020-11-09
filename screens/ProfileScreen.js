import {Button, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import IconTextBorderlessBtn from '../components/Profile/IconTextBorderlessBtn';
import color from '../constants/color';

const ProfileScreen = ({navigation}) => {
  //TODO: if a user has a profile pic, use that else use the profile icon
  const profilePicUrl = 'https://ohe-test-image-upload-1.s3.amazonaws.com/44e97045-fd97-4882-8ed1-942934d6bee4.png'
  const profilePicPlaceholderTruth = false
  const Sign_out = () => {
    /*auth()
      .signOut()
      .then(
        () => console.log('User signed out!'),
        navigation.dispatch(StackActions.replace('Login')),
      );*/
      console.log('Sign_out clicked')
  };

  return (
    <View style={styles.screen}>
      <ScrollView >
      <View style={styles.settingsLogoutContainer} >
        <IconTextBorderlessBtn textFirst={false} btnText='Settings'
         btnImage={require('../assets/icons/settings-outline.png')}  
         onPress={() => console.log('settings clicked')}
        />
        <IconTextBorderlessBtn textFirst={true} btnText='Logout'
         btnImage={require('../assets/icons/log-out.png')}  
         onPress={() => Sign_out()}
        />
      </View>
      <View style={{width: '100%', alignItems: 'center'}} >
        <View style={styles.profilePicContainer}>
          <Image style={styles.profilePic} source={profilePicPlaceholderTruth? {uri: profilePic}:require('../assets/icons/profile.png')} />
        </View>
      </View>


      {/*
      <View style={styles.main}>
        <Text>ProfileScreen,,{auth().currentUser.email}</Text>
        <Button title="Sign-out" onPress={() => Sign_out()} />
      </View>
      */}
      </ScrollView>
    </View>

  );
};


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
  settingsLogoutContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',

    padding: 5
  },
  profilePicContainer: {
    height: 150,
    width: 150,

    borderRadius: 75,
    borderWidth: 1,
    borderColor: color.STEEL_BLUE,
    overflow: "hidden"
  },
  profilePic: {
    width:'100%',
    height: '100%'
  }
});

export default ProfileScreen;
