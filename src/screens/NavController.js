import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import SellerScreen from './SellerScreen';
import HomeScreen from './HomeScreen';
import TabContainer from './TabContainer';
import UserTypeScreen from './UserTypeScreen';
import ProductDetails from './ProductDetails';
const Stack = createNativeStackNavigator();

const NavController = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        // Hiding header for Splash Screen
        options={{ headerShown: false }}
      />
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
          headerShown: true,
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
          headerShown: false,
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
        name="tabview"
        component={TabContainer}
        options={{
          title: 'Tab', //Set Header Title
          headerShown: false,
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
       <Stack.Screen
        name="Productinfo"
        component={ProductDetails}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default NavController
