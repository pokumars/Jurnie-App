import {Button, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import IconTextBorderlessBtn from '../components/Profile/IconTextBorderlessBtn';

const ProfileScreen = ({navigation}) => {
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
    padding: 15
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsLogoutContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
});

export default ProfileScreen;
