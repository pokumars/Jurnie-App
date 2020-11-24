/* eslint-disable global-require */
/* eslint-disable no-console */
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { StackActions } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import TmdApi from '../bridge/TmdApi';

const user = auth().currentUser;

console.log('User info for provider: ', user);
function login({ navigation }) {
  const [email, setemail] = React.useState('');
  const [pass, setpass] = React.useState('');

  const Authentication = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        //TmdApi.startTmdService();
        console.log('User account created & signed in!');
        navigation.dispatch(StackActions.replace('Main'));
        // navigation.dispatch(StackActions.replace('Profile'));
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
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <View style={{ flex: 1 }}>
        <View style={{ alignSelf: 'center', backgroundColor: '#000000' }}>
          <Image
            source={require('../assets/moprim.png')}
            style={{
              width: 170,
              height: 170,
              borderRadius: 100,
              backgroundColor: '#000000',
            }}
          />
        </View>
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome back</Text>
        <Text>Use your credentials below and login to your account</Text>

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
            placeholder="Pass"
            maxLength={15}
            value={pass}
            onChangeText={setpass}
          />
        </View>
        <View
          style={{
            width: 120,

            alignSelf: 'center',
          }}>
          <Button title="Login" onPress={() => Authentication()} />
        </View>

        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
          <Text>Forgot your Password</Text>
          <TouchableOpacity style={{ marginStart: 5 }}>
            <Text style={{ color: '#1E90FF' }}>retrieve</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ alignSelf: 'center', color: 'white' }}>
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
          <Text style={{ color: 'white' }}>Don't have an Account</Text>
          <TouchableOpacity
            style={{ marginStart: 5 }}
            onPress={() => navigation.dispatch(StackActions.replace('Register'))}>
            <Text style={{ color: '#1E90FF' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default login;
