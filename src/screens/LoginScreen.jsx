// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Image,
} from 'react-native';
import { Checkbox, Text, TextInput } from 'react-native-paper'

import Loader, { sleep } from '../components/Loader';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { KEY_IS_USER_LOGDED, KEY_PASSWORD, KEY_REMEMBER_ME, KEY_USER_EMAIL, KEY_USER_ID, KEY_USER_NAME, KEY_USER_PASSWORD, retrieveItem, storeItem } from '../utils/asyncStorage';
import realmSchema from '../database/RealmConfig';
import { useDispatch,useSelector } from 'react-redux';
import { clearState, login } from '../services/slices/loginSlice';
// let realm = new Realm({ path: 'UserDatabase.realm' });

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false)

  //Clear state
  React.useEffect(() => {
    dispatch(clearState());
  }, []);

  const handleSubmitPress = async () => {
    if (!userEmail) {
      showMessage({
        message: "Please fill Email"
      });
      return;
    }
    if (!userPassword) {
      showMessage({
        message: "Please fill Password"
      });
      return;
    }
    setLoading(true);
    await sleep(2000)
    let data = {
      email: userEmail,
      userPassword: userPassword
    }
    try {
      dispatch(login(data))
        .unwrap()
        .then((res) => {
          console.log("res",res)
          if (res == undefined) {
            showMessage({
              message: "Something went wrong"
            });
            return
          }
          if (res.status == "Success") {
            showMessage({
              message: res.message
            });
            let data = res.data

            if (data) {
              storeItem(KEY_USER_NAME, data.first_name)
              storeItem(KEY_USER_ID, data.id)
              if (checked) {
                storeItem(KEY_USER_EMAIL, data.email)
                storeItem(KEY_USER_PASSWORD, data.password)
                storeItem(KEY_REMEMBER_ME, "true")
              } else {
                storeItem(KEY_REMEMBER_ME, "false")
              }
              storeItem(KEY_IS_USER_LOGDED, "true")
            }
            navigation.replace('tabview');
          } else if (res.status == "Failure") {
            showMessage({
              message: res.message
            });
          } else {
            showMessage({
              message: res
            });
          }
        })
    } catch (e) {
      showMessage({
        message: e.message
      });
    } finally {
      setLoading(false);
    };

    /* 
        try {
          var response = realmSchema.objects('user_details')
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
                  storeItem(KEY_IS_USER_LOGDED, "true")
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
    
     */
  };

  const checkEmailVaid = (email) => {
    var response = realmSchema.objects('user_details')
    return response.some(userMail => userMail.user_email.toLowerCase() == email.toLowerCase())
  }


  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1, }}>
      <Loader loading={loading} />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/thrifty_logo.jpg')}
          style={{
            width: '50%',
            height: 100,
            resizeMode: 'contain',
            margin: 30,
          }}
        />
        <View style={styles.containerView} >
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="#003f5c"
              onChangeText={text => setUserEmail(text)} />
          </View>
          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="#003f5c"
              onChangeText={text => setUserPassword(text)} />
          </View>

          <View style={styles.checkboxContainer}>
            <View style={{ flex: 1, height: 40 }}>
              <View style={{
                flex: 1, marginLeft: 'auto', marginStart: 15, marginTop: 5,
                flexDirection: 'row', alignItems: 'center', marginEnd: 20,
              }}>
                <View>
                  <Checkbox
                    style={styles.checkbox}
                    checked={true}
                    onCheck={() => setChecked(!checked)}
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                </View>

                <Text style={styles.forgot}>
                  Remember Me
                </Text>
              </View>
            </View>
            {/* <View style={{ flex: 2, height: 30 }}>
                            <TouchableOpacity style={{ flex: 2, marginLeft: 'auto', marginEnd: 25, marginTop: 10 }}>
                                <Text style={styles.forgot}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View> */}
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={() => { handleSubmitPress() }}>
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupBtn} onPress={() => { 
            navigation.replace("RegisterScreen")
            }}>
            <Text style={[styles.loginText,{color:'#00306b'}]}>New user , Register here</Text>
          </TouchableOpacity>


        </View>


      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerView: {
    margin: 10,
    borderRadius: 10,
    width: "90%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    color: "white"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#00306b",
    marginBottom: 10
  },
  title2: {
    fontWeight: "bold",
    fontSize: 45,
    color: "#00306b",
    marginBottom: 40
  },
  inputView: {
    marginTop: 20,
    width: "85%",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
  },
  inputText: {
    height: 50,
    shadowColor: "#f0f0f0",
    borderWidth: 0,
    underlineColorAndroid: "transparent",
    backgroundColor: '#f0f0f0',
    borderColor: "#f0f0f0",
  },
  forgot: {
    color: "#6d6d6d",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#303030",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  signupBtn: {
    width: "80%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: 'row', alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#303030',
    borderColor: "#303030",
  },
  textStyle: {
    fontSize: 16,
    color: 'black',
    flex: 1
  },
});