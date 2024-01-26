/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "./ignoreWarnings"
import Realm from "realm";
Realm.flags.THROW_ON_GLOBAL_REALM = true
import React, { useEffect } from 'react';
import {
  LogBox,
  StyleSheet,
} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import { persistStore } from "redux-persist";
import store from "./src/services/Store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import NavController from "./src/screens/NavController";
import FlashMessage from "react-native-flash-message";

let persistor = persistStore(store);

Realm.flags.THROW_ON_GLOBAL_REALM = true
LogBox.ignoreLogs(['Your app is relying on a Realm global, which will be removed in realm-js v13, please update your code to ensure you import Realm:', 'ReactImageView: Image source',
'BSON: For React Native please polyfill crypto.getRandomValues, e.g. using: https://www.npmjs.com/package/react-native-get-random-values.'])
LogBox.ignoreAllLogs

const App = () => {

  const requestPermission = () => {
    request(PERMISSIONS.IOS.CAMERA).then(result => {
      console.log(result);
    });
  };
  useEffect(
    ()=>{
      requestPermission()
    },[]
  )

  return (
    <>
      <NavController />
      <FlashMessage position="bottom"
        icon="auto"
        duration={3000} />
    </>
  );
};

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


const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;