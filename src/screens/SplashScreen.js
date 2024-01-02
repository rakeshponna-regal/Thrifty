// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { KEY_IS_DUMMY_DATA, KEY_IS_USER_LOGDED, retrieveItem, storeItem } from '../utils/asyncStorage';
import realmSchema from '../database/RealmConfig';
import { products } from '../utils/Constants';
const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    realmSchema
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem(KEY_IS_USER_LOGDED).then((value) => {
        console.log("KEY_IS_USER_LOGDED", value)
        if (value == null || value == undefined) {
          navigation.replace('LoginScreen');
        } else if (value == "true") {
          navigation.replace('UserType');
        }
      });
    }, 5000);

  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/thrifty_logo.jpg')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#000000"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});