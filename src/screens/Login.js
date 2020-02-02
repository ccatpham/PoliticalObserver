import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {colors} from '../styles';
import auth, {firebase} from '@react-native-firebase/auth';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errormsg: '',
    };
  }

  onPressLogin = () => {
    // pluck values from your `google-services.json` file you created on the firebase console
    const androidConfig = {
      clientId:
        '779830787631-frm6o8rcpr1hs4mapu4rkub9advt9dm5.apps.googleusercontent.com',
      appId: '1:779830787631:android:a33884db73c09845d850da',
      apiKey: 'AIzaSyBFYatMeWlnfPeljCRTzm0sXRKfKqkOkLE',
      databaseURL: 'https://politicalobserver-2e4ab.firebaseio.com',
      storageBucket: 'politicalobserver-2e4ab.appspot.com',
      messagingSenderId: '779830787631',
      projectId: 'politicalobserver-2e4ab',

      // enable persistence by adding the below flag
      persistence: true,
    };
    //check if app instance is initialized do not duplicate
    if (!firebase.apps.length) {
      firebase
        .initializeApp(
          // use platform-specific firebase config
          androidConfig,
        )
        .then(app => console.log('initialized apps ->', firebase.apps));
    }
    if (this.state.email != '' && this.state.password != '') {
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(
          () => {
            this.props.navigation.reset(
              [NavigationActions.navigate({routeName: 'Dashboard'})],
              0,
            );
          },
          value => {
            this.setState({
              errormsg: value.message,
            });
          },
        );
    } else {
      this.setState({
        errormsg: 'Required field cannot be empty.',
      });
    }
  };

  onChangeEmail(email) {
    this.setState({
      email: email,
    });
  }

  onChangePassword(password) {
    this.setState({
      password: password,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={'Email'}
            placeholderTextColor={colors.paleGreen}
            onChangeText={email => this.onChangeEmail(email)}
            value={this.state.email}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Password'}
            placeholderTextColor={colors.paleGreen}
            onChangeText={password => this.onChangePassword(password)}
            value={this.state.password}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={errormsg => this.onChangePassword(errormsg)}
            value={this.state.errormsg}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={this.onPressLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 60,
  },
  inputTitleText: {
    fontSize: 16,
    color: colors.paleGreen,
  },
  textInput: {
    fontSize: 16,
    color: colors.paleGreen,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  loginButtonContainer: {
    marginHorizontal: 60,
    marginBottom: 40,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: colors.paleGreen,
  },
  loginButtonText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    fontSize: 16,
    color: colors.white,
    overflow: 'hidden',
  },
});
