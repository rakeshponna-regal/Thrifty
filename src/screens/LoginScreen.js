// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader, { sleep } from '../components/Loader';
import Realm from 'realm';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import CheckBox from '@react-native-community/checkbox';
import { KEY_IS_USER_LOGDED, KEY_PASSWORD, KEY_REMEMBER_ME, KEY_USER_EMAIL, KEY_USER_PASSWORD, retrieveItem, storeItem } from '../utils/asyncStorage';
let realm = new Realm({ path: 'UserDatabase.realm' });

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const passwordInputRef = createRef();

  const handleSubmitPress = async () => {
    if (!userEmail) {
      Alert.alert("Please fill Email")
      return;
    }
    if (!userPassword) {
      Alert.alert('Please fill Password');
      return;
    }
    setLoading(true);
    await sleep(2000)

    try {
      var response = realm.objects('user_details')
      if (checkEmailVaid(userEmail)) {
        response.map((user) => {
          console.log('user', user)
          if (user.user_email.toLowerCase() == userEmail.toLowerCase()) {
            if (user.user_email.toLowerCase() == userEmail.toLowerCase() && user.user_password == userPassword) {
              console.log('Login Successful!')
              showMessage({
                message: 'Login Successful!'
              });
              if (toggleCheckBox) {
                storeItem(KEY_USER_EMAIL, user.user_email)
                storeItem(KEY_USER_PASSWORD, user.user_password)
                storeItem(KEY_REMEMBER_ME, "true")
              } else {
                storeItem(KEY_REMEMBER_ME, "false")
              }
              storeItem(KEY_IS_USER_LOGDED,"true")
              navigation.replace('UserType');
  
            } else {
              showMessage({
                message: 'Invalid password. Please try again.'
              });
              return
            }
          }
        })
      } else {
        showMessage({
          message: 'Invalid Email id. Please try again.'
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }

   
  };

  const checkEmailVaid = (email) => {
    var response = realm.objects('user_details')
    return response.some(userMail => userMail.user_email.toLowerCase() == email.toLowerCase())
  }

  useEffect(() => {
    try {
      var user_details = realm.objects('user_details');
      console.log("user_details =>", user_details)
      var products = realm.objects('products');
      console.log("products", products)
      retriveLocal()
    } catch (error) {
      console.log(error)
    }
   
  }, [])

  const retriveLocal = async () => {
    var remember = await retrieveItem(KEY_REMEMBER_ME)
    if (remember == "true") {
      var email = await retrieveItem(KEY_USER_EMAIL)
      var password = await retrieveItem(KEY_USER_PASSWORD)
      setUserEmail(email)
      setUserPassword(password)
      setToggleCheckBox(true)
    }
    console.log("email", email)
  }

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <FlashMessage />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/images/thrifty_logo.jpg')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                color='#000000'
                value={userEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                color='#000000'
                value={userPassword}
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <View style={styles.checkboxContainer}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text style={styles.label}> Remember me</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                handleSubmitPress()
                //navigation.navigate('UserType');
              }}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginEnd: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginTop: 5,
    fontStyle: 'normal',
    fontFamily: '200',
    fontWeight: 'bold',
    color: '#000000',
  },
});