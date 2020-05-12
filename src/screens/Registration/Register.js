import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import {colors} from '../../styles';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  onPressContinue = () => {
    if (
      this.state.password !== '' &&
      this.state.password === this.state.confirmPassword
    ) {
      if (this.state.email !== '') {
        this.props.navigation.navigate('Register Demographics', {
          user: {
            email: this.state.email.toLowerCase(),
            password: this.state.password,
          },
        });
      } else {
        Alert.alert('Error', 'Email field must be filled.', [{text: 'OK'}], {
          cancelable: false,
        });
      }
    } else {
      Alert.alert('Error', 'Passwords must match.', [{text: 'OK'}], {
        cancelable: false,
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

  onChangeConfirmPassword(password) {
    this.setState({
      confirmPassword: password,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Sign up with your email</Text>
          </View>
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={'Email'}
              placeholderTextColor={colors.polPlaceholderGray}
              onChangeText={email => this.onChangeEmail(email)}
              value={this.state.email}
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder={'Password'}
              placeholderTextColor={colors.polPlaceholderGray}
              onChangeText={password => this.onChangePassword(password)}
              value={this.state.password}
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder={'Confirm Password'}
              placeholderTextColor={colors.polPlaceholderGray}
              onChangeText={password => this.onChangeConfirmPassword(password)}
              value={this.state.confirmPassword}
            />
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By creating an account you agree
              </Text>
              <View style={styles.termsLineContainer}>
                <Text style={styles.termsText}>to our </Text>
                <TouchableOpacity style={styles.termsLinkContainer}>
                  <Text style={styles.termsLink}>Terms and Conditions</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.termsLineContainer}>
                <Text style={styles.termsText}>and to our </Text>
                <TouchableOpacity style={styles.termsLinkContainer}>
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </TouchableOpacity>
                <Text style={styles.termsText}>.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.continueButtonContainer}
          onPress={this.onPressContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.polWhite,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  headerText: {
    margin: 10,
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
  textInput: {
    width: 250,
    textAlign: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    borderRadius: 5,
    backgroundColor: colors.polLightGray,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  termsContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
  },
  termsLineContainer: {
    flexDirection: 'row',
  },
  termsLinkContainer: {},
  termsLink: {
    fontSize: 14,
    color: colors.polBlue,
  },
  continueButtonContainer: {
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
  continueButtonText: {
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
});
