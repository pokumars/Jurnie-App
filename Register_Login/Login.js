/* eslint-disable global-require */
/* eslint-disable no-console */
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import { StackActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';


const user = auth().currentUser;

console.log('User info for provider: ', user);
function login({ navigation }) {
  const [email, setemail] = React.useState('');
  const [pass, setpass] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(null)

  const Authentication = () => {
    if (email.trim().length === 0 || pass.trim().length === 0) {
      const emptyFieldsWarning = 'The email or password field is empty';
      setErrorMessage(emptyFieldsWarning);
      ToastAndroid.show(emptyFieldsWarning, ToastAndroid.LONG);
      return;
    }
    auth()
      .signInWithEmailAndPassword(email.trim(), pass)
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        console.log('User account created & signed in!');

        navigation.dispatch(StackActions.replace('Main'));
        // navigation.dispatch(StackActions.replace('Profile'));
      })
      .catch((error) => {
        let errorText = '';
        if (error.code === 'auth/email-already-in-use') {
          errorText = 'That email address is already in use!'
          ToastAndroid.show(errorText, ToastAndroid.LONG);
          setErrorMessage()
          console.log('That email address is already in use!');

        } else if (error.code === 'auth/invalid-email') {
          errorText = 'That email address is invalid!'
          ToastAndroid.show(errorText, ToastAndroid.LONG);
          console.log('That email address is invalid!');

        } else {
          errorText = 'Something went wrong!'
          console.error(error);
          ToastAndroid.show(errorText, ToastAndroid.LONG);
        }
      });
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View>
          <View style={styles.logoContainer}>
            <Image
              // eslint-disable-next-line global-require
              source={require('../assets/moprim.png')}
              style={styles.logo}
            />
          </View>
        </View>
        <View style={styles.loginFormContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>
            Welcome back
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Use your credentials below and login to your account
          </Text>
          <Text style={[styles.errorMessage]}>{errorMessage}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/icons/email.png')}
              style={styles.inputImage}
            />
            <TextInput
              style={styles.input}
              placeholder="email"
              value={email}
              onChangeText={setemail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/icons/key.png')}
              style={styles.inputImage}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              maxLength={15}
              value={pass}
              secureTextEntry
              onChangeText={setpass}
            />
          </View>
          <View style={styles.btnView}>
            <Button title="Login" onPress={() => Authentication()} />
          </View>
          {
            // we dont have the retrieve password
            /*
                      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                      <Text>Forgot your Password</Text>
                      <TouchableOpacity style={{ marginStart: 5 }}>
                        <Text style={{ color: '#1E90FF' }}>Retrieve</Text>
                      </TouchableOpacity>
                    </View>
                    */
          }
        </View>
        <View style={styles.loginFormContainer}>
          <Text style={{ color: 'black' }}> Don&apos;t have an Account? </Text>
          <TouchableOpacity
            style={{ marginStart: 5 }}
            onPress={() =>
              navigation.dispatch(StackActions.replace('Register'))
            }>
            <Text style={{ color: '#1E90FF' }}>Register</Text>
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
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  loginFormContainer: {
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
  errorMessage: {
    color: '#e52d27',
    marginBottom: 5,
  }
});

export default login;
/* Social media login


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
            <Text style={{ color: 'white' }}> Don't have an Account </Text>
            <TouchableOpacity
              style={{ marginStart: 5 }}
              onPress={() => navigation.dispatch(StackActions.replace('Register'))}>
              <Text style={{ color: '#1E90FF' }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

*/
