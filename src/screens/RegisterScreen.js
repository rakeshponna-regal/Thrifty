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
import Loader from '../components/Loader';
import Realm from 'realm';
let realm = new Realm({ path: 'UserDatabase.realm' });
const RegisterScreen = ({navigation}) => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitAction = async () => {
    setErrortext('');
    if (!firstName) {
      Alert.alert('Please fill First name');
      return;
    }
    if (!lastName) {
      Alert.alert('Please fill Last name');
      return;
    }
    if (!userEmail) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      Alert.alert('Please fill Password');
      return;
    }
    //Show Loader
    // setLoading(true);
    realm.write(() => {
      var ID = realm.objects('user_details').sorted('user_id', true).length > 0
        ? realm.objects('user_details').sorted('user_id', true)[0]
          .user_id + 1
        : 1;

      realm.create('user_details', {
        user_id: ID,
        first_name: firstName,
        last_name: lastName,
        user_email: userEmail,
        user_password: userPassword,
      });
      Alert.alert(
        'Success',
        'You are registered successfully',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('LoginScreen'),
          },
        ],
        { cancelable: false }
      );

    })
  }

  const handleSubmitButton = () => {
    setErrortext('');
    if (!firstName) {
      Alert('Please fill First name');
      return;
    }
    if (!lastName) {
      Alert('Please fill Last name');
      return;
    }
    if (!userEmail) {
      Alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      Alert('Please fill Password');
      return;
    }
    //Show Loader
    setLoading(true);



    var dataToSend = {
      name: userName,
      email: userEmail,
      age: userAge,
      address: userAddress,
      password: userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          setIsRegistraionSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/images/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
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
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
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
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
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
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
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
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          {/* <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={styles.label}>Seller Account</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={styles.label}>Buyer Account</Text>
          </View> */}

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
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