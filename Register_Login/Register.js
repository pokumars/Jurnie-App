import { Button, Image, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import { NavigationContainer, StackActions } from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import { generate as generateUsername } from '../helpers/randomUsernameGenerator'

const LOGO_SIZE = 150;
const user = auth().currentUser;
console.log('User info for provider: ', user);
function register({navigation}) {
  const [email, setemail] = React.useState('');
  const [pass, setpass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const randomUsername = generateUsername();

  const Authentication = () => {
    if (pass === confirmPass && email.length > 8) {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          console.log('User account created & signed in!');
          auth()
            .currentUser.updateProfile({ displayName: randomUsername })
            .then(() => navigation.dispatch(StackActions.replace('Main')));
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    } else if (pass.length < 8 && pass === confirmPass && (email.length > 8 || email.length < 8)) {
      Toast.show({
        text1: 'Password length is less than 8 characters',
      });
    } else if (email.length < 8 && pass === confirmPass && (pass.length > 8 || pass.length < 8)) {
      Toast.show({
        text1: 'Email is incorrect',
      });
    } else if (pass !== confirmPass && (email.length > 8 || email.length < 8)) {
      Toast.show({
        text1: 'Passwords not matching',
      });
    } else if (pass === confirmPass && email.length < 8) {
      Toast.show({
        text1: 'Email is incorrect',
      });
    } else {
      Toast.show({
        text1: 'Please fill-in the fields properly',
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <View style={{ flex: 1 }}>
        <View style={{ alignSelf: 'center', backgroundColor: '#000000' }}>
          <Image
            source={require('../assets/moprim.png')}
            style={{
              width: LOGO_SIZE,
              height: LOGO_SIZE,
              borderRadius: LOGO_SIZE/ 2,
              backgroundColor: '#000000',
            }}
          />
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: '#F0FFFF',
          borderRadius: 30,
          margin: 10,
          flexDirection: 'column',
          justifyContent: 'space-around',
          paddingTop: 10,
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create account</Text>
        <Text>Please fill-in your Email and Password</Text>

        <View
          style={{
            flexDirection: 'row',
            borderColor: '#1E90FF',
            borderWidth: 2,
          }}>
          <Image
            source={require('../assets/icons/email.png')}
            style={{
              marginTop: 9,
              marginStart: 5,
              width: 30,
              height: 30,
              alignContent: 'center',
              alignItems: 'center',
            }}
          />
          <TextInput
            style={{ width: 200, marginStart: 5 }}
            placeholder="email"
            value={email}
            onChangeText={setemail}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#1E90FF',
            borderWidth: 2,
          }}>
          <Image
            source={require('../assets/icons/key.png')}
            style={{
              marginTop: 9,
              marginStart: 5,
              width: 30,
              height: 30,
              alignContent: 'center',
              alignItems: 'center',
            }}
          />
          <TextInput
            style={{ width: 200, marginStart: 5 }}
            placeholder="password"
            maxLength={15}
            value={pass}
            onChangeText={setpass}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#1E90FF',
            borderWidth: 2,
          }}>
          <Image
            source={require('../assets/icons/key.png')}
            style={{
              marginTop: 9,
              marginStart: 5,
              width: 30,
              height: 30,
              alignContent: 'center',
              alignItems: 'center',
            }}
          />
          <TextInput
            style={{ width: 200, marginStart: 5 }}
            placeholder="Confirm password"
            maxLength={15}
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
        </View>
        <View
          style={{
            width: 120,
            borderRadius: 5,
            alignSelf: 'center',
          }}>
          <Button title="Register" onPress={() => Authentication()} />
        </View>
      </View>
    </View>
  );
}
/*
      <View style={{flex: 1}}>
        <Text style={{alignSelf: 'center', color: 'white'}}>
          Or use one of your social accounts
        </Text>
        <View
          style={{
            marginVertical: 30,
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#F0FFFF',
              marginRight: 40,
              borderRadius: 20,
            }}>
            <Image
              source={require('../assets/icons/twitter.png')}
              style={{ width: 40, height: 40 }}
            />
          </View>

          <View
            style={{
              backgroundColor: '#F0FFFF',
              borderRadius: 20,
            }}>
            <Image
              source={require('../assets/icons/gmail.png')}
              style={{ width: 40, height: 40 }}
            />
          </View>

          <View
            style={{
              backgroundColor: '#F0FFFF',
              marginLeft: 40,
              borderRadius: 20,
            }}>
            <Image
              source={require('../assets/icons/faceb.png')}
              style={{ width: 40, height: 40 }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
          <Text style={{ color: 'white' }}>Already have an Account</Text>
          <TouchableOpacity
            style={{ marginStart: 5 }}
            onPress={() => navigation.dispatch(StackActions.replace('Login'))}>
            <Text style={{ color: '#1E90FF' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View> */
export default register;
