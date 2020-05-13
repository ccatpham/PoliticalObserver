import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {colors} from '../styles';
import backgroundImage from '../../res/images/background.jpg';

export default class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.unSubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  onPressLogin = () => {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: 'Login',
      }),
    );
  };

  onPressSignUp = () => {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: 'Register',
      }),
    );
  };

  render() {
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundContainer}>
        <SafeAreaView style={styles.container}>
          <View style={styles.overlay} />
          <Text style={styles.appTitle}>Political Observer</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.signUpButtonContainer}
              onPress={this.onPressSignUp}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButtonContainer}
              onPress={this.onPressLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
    alignContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 60,
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonContainer: {
    width: 200,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: colors.polBlue,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpButtonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polWhite,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonContainer: {
    width: 200,
    marginBottom: 40,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: colors.polBlue,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polWhite,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  appTitle: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 30,
    fontSize: 50,
    color: colors.polWhite,
    overflow: 'hidden',
    fontWeight: 'bold',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.2,
    backgroundColor: 'black',
  },
});
