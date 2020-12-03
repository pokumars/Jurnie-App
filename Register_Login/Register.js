/* eslint-disable no-console */
/* eslint-disable global-require */
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import { StackActions } from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { generate as generateUsername } from '../helpers/randomUsernameGenerator';

const LOGO_SIZE = 150;
const user = auth().currentUser;
console.log('User info for provider: ', user);
function register({ navigation }) {
  const [email, setemail] = React.useState('');
  const [pass, setpass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [randomUsername, setRandomusername] = React.useState(
    generateUsername(),
  );

  const AddUserToFirestore = () => {
    const name = auth().currentUser.email;
    console.log(randomUsername);
    firestore().collection('users').doc(name).set({
      email: name,
      userName: randomUsername,
      profileImgUrl: '',
      totalFeeds: 0,
      totalfeedBacks: 0,
    });
    firestore().collection('users').doc(name).collection('trips').doc('demo').set({
      demo: true,
    });
  };

  const Authentication = () => {
    if (pass === confirmPass && email.length > 8) {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          console.log('User account created & signed in!'),
            auth()
              .currentUser.updateProfile({ displayName: randomUsername })
              .then(
                () => AddUserToFirestore(),
                navigation.dispatch(StackActions.replace('Main')),
              );
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
    <View style={styles.screen}>
      <ScrollView>
        <View>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/moprim.png')} style={styles.logo} />
          </View>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
        <View style={styles.formContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create account</Text>
          <Text>Please fill-in your Email and Password</Text>

          <View style={styles.inputContainer}>
            <Image source={require('../assets/icons/email.png')} style={styles.inputImage} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setemail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('../assets/icons/key.png')} style={styles.inputImage} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              maxLength={15}
              secureTextEntry
              value={pass}
              onChangeText={setpass}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('../assets/icons/key.png')} style={styles.inputImage} />
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              secureTextEntry
              maxLength={15}
              value={confirmPass}
              onChangeText={setConfirmPass}
            />
          </View>
          <View style={styles.btnView}>
            <Button title="Register" onPress={() => Authentication()} />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{ color: 'black' }}> Already have an Account? </Text>
          <TouchableOpacity
            style={{ marginStart: 5 }}
            onPress={() => navigation.dispatch(StackActions.replace('Login'))}>
            <Text style={{ color: '#1E90FF' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  logoContainer: { alignSelf: 'center' },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
  },
  formContainer: {
    backgroundColor: '#F0FFFF',
    borderRadius: 20,
    margin: 10,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  inputImage: {
    marginTop: 9,
    marginStart: 5,
    width: 30,
    height: 30,
    alignContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: '#1E90FF',
    borderWidth: 2,
  },
  input: { width: 200, marginStart: 5 },
  btnView: { width: 120, marginTop: 10 },
});

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
        <View
          style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
          <Text style={{ color: 'white' }}>Already have an Account</Text>
          <TouchableOpacity
            style={{ marginStart: 5 }}
            onPress={() => navigation.dispatch(StackActions.replace('Login'))}>
            <Text style={{ color: '#1E90FF' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View> */
export default register;
