/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './Screens/SplashScreen';
import OptionScreen from './Screens/OptionScreen';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Information1 from './Screens/Information1';
import HomeScreen from './Screens/HomeScreen';
import QRCodeScanner from './Screens/QRCodeScanner';
import PinCodeScreen from './Screens/PinCodeScreen';
import PatientHistory from './Screens/PatientHistory';
import PersonalInfo from './Screens/PersonalInfo';
import PatientInfoScreen from './Screens/PatientInfoScreen';

const App = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
  },
  OptionScreen: {
    screen: OptionScreen,
  },
  SignUp: {
    screen: SignUp,
  },
  Information1: {
    screen: Information1,
  },
  SignIn: {
    screen: SignIn,
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
  PatientHistory: {
    screen: PatientHistory,
  },
  PersonalInfo: {
    screen: PersonalInfo,
  },
  PatientInfoScreen: {
    screen: PatientInfoScreen,
  }
});
export default createAppContainer(App);
