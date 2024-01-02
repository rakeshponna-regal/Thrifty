/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "./ignoreWarnings"
import React, { useEffect } from 'react';
import {
  LogBox,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import UserTypeScreen from './src/screens/UserTypeScreen';
import SellerScreen from './src/screens/SellerScreen';
import Realm from "realm";
const Stack = createNativeStackNavigator();
Realm.flags.THROW_ON_GLOBAL_REALM = true
LogBox.ignoreLogs(['Your app is relying on a Realm global, which will be removed in realm-js v13, please update your code to ensure you import Realm:'])
LogBox.ignoreAllLogs

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#FFFFFF', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />

      <Stack.Screen
        name="sellerScreen"
        component={SellerScreen}
        options={{
          title: 'Upload Product', //Set Header Title
          headerStyle: {
            backgroundColor: '#FFFFFF', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />

      <Stack.Screen
        name="buyerScreen"
        component={HomeScreen}
        options={{
          title: 'Buyer', //Set Header Title
          headerStyle: {
            backgroundColor: '#FFFFFF', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
        <Stack.Screen
          name="UserType"
          component={UserTypeScreen}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page 
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        */}
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
