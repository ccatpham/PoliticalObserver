import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../styles';

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
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer} />
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
});
