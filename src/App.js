import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './Router';
import app from '@react-native-firebase/app';

const firebaseConfig = {
  clientId:
    '779830787631-frm6o8rcpr1hs4mapu4rkub9advt9dm5.apps.googleusercontent.com',
  appId: '1:779830787631:android:a33884db73c09845d850da',
  apiKey: 'AIzaSyBFYatMeWlnfPeljCRTzm0sXRKfKqkOkLE',
  databaseURL: 'https://politicalobserver-2e4ab.firebaseio.com',
  storageBucket: 'politicalobserver-2e4ab.appspot.com',
  messagingSenderId: '779830787631',
  projectId: 'politicalobserver-2e4ab',
  persistence: true,
};

export default class App extends React.Component {
  constructor() {
    super();
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
  }
  render() {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  }
}
