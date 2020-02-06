import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {colors} from '../styles';
import backgroundImage from '../../res/images/background.jpg';

export default class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onPressLogin = () => {
    this.props.navigation.navigate('Login');
  };

  onPressSignUp = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundContainer}>
        <SafeAreaView style={styles.container}>
          <View style={styles.overlay} />
          <Text style={styles.appTitle}>Political Observer</Text>
          <View>
            <Text style={styles.appDescription}>
              Your companion for reliable political content
            </Text>
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
  signUpButtonContainer: {
    marginHorizontal: 60,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: colors.paleGreen,
  },
  signUpButtonText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    fontSize: 16,
    color: colors.white,
    overflow: 'hidden',
  },
  loginButtonContainer: {
    marginHorizontal: 60,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: colors.white,
  },
  loginButtonText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    fontSize: 16,
    color: colors.paleGreen,
    overflow: 'hidden',
  },
  appTitle: {
    textAlign: 'left',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    fontSize: 50,
    color: colors.white,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  appDescription: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    fontSize: 25,
    color: colors.white,
    overflow: 'hidden',
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
