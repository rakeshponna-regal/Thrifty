// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Loader, { sleep } from '../components/Loader';
import { useDispatch } from 'react-redux';
import { clearState, register } from '../services/slices/registerSlice';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { validateEmail } from '../utils/utils';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  React.useEffect(() => {
    dispatch(clearState());
  }, []);

  const handleSubmitAction = async () => {
    if (!firstName) {
      showMessage({
        message: "Please fill First name",
      })
      return;
    }
    if (!lastName) {
      showMessage({
        message: "Please fill Last name",
      })
      return;
    }
    if (!userEmail) {
      showMessage({
        message: "Please fill  id",
      })
      return;
    }
    if (!validateEmail(userEmail)) {
      showMessage({
        message: "Please enter valid email id"
      });
      // Alert.alert('Please enter valid email id');
      return;
    }
    if (!userPassword) {
      showMessage({
        message: "Please enter valid password"
      });
      return;
    }
    setLoading(true);
    let user = {
      firstname: firstName,
      lastname: lastName,
      email: userEmail.toLowerCase(),
      password: userPassword,
      role :'customer',
      avatar:"https://i.imgur.com/DTfowdu.jpg"
    }
    await sleep(1000)
    try {
      dispatch(register(user))
        .unwrap()
        .then((res) => {
          console.log(res)
          if (res.status == "Success") {
            Alert.alert(
              res.status,
              res.message,
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.replace('LoginScreen'),
                },
              ],
              { cancelable: false }
            );
          } else if (res.status == "Failure") {
            console.log("Failure")
            showMessage({
              message: `${res.message}`,
            })
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
  }
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      alignContent: 'center'
    }}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
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
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(firstName) => setfirstName(firstName)}
              underlineColorAndroid="#f000"
              color="#000000"
              value={firstName}
              placeholder="Enter First name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"

              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(lastName) => setLastName(lastName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Last name"
              placeholderTextColor="#8b9cb5"
              color="#000000"
              value={lastName}
              autoCapitalize="sentences"
              returnKeyType="next"

              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              color="#000000"
              value={userEmail}
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"

              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              color="#000000"
              value={userPassword}
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}

              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitAction}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 35,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});