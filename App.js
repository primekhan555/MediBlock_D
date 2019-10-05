/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './Screens/SplashScreen';
import OptionScreen from './Screens/OptionsScreen';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Information1 from './Screens/Information1';
import HomeScreen from './Screens/HomeScreen';
import QRCodeScanner from './Screens/QRCodeScanner';
import PinCodeScreen from './Screens/PinCodeScreen';
import PatientHistory from './Screens/PatientHistory';

const App = createStackNavigator({
  SplashScreen:{
    screen:SplashScreen,
  },
  OptionScreen:{
    screen:OptionScreen,
  },
  SignUp:{
    screen:SignUp,
  },
  Information1:{
    screen:Information1,
  },
  SignIn:{
    screen:SignIn,
  },
  HomeScreen: {
    screen: HomeScreen,
  },
  QRCodeScanner: {
    screen: QRCodeScanner,
  },
  PinCodeScreen: {
    screen: PinCodeScreen,
  },
  PatientHistory:{
    screen:PatientHistory,
  },
});
export default createAppContainer(App);
