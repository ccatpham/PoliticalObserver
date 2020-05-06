import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {colors} from '../styles';
import auth from '@react-native-firebase/auth';
import pol_api from '../api/pol_api';
import pol from '../api/apiConfig';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onPressLogin = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      auth()
        .signInWithEmailAndPassword(
          this.state.email.toLowerCase(),
          this.state.password,
        )
        .then(() => {
          pol.api
            .getUserByEmail(this.state.email.toLowerCase())
            .then(user => {
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'TabNavigator', params: {user: user}}],
                }),
              );
            })
            .catch(error => {
              Alert.alert(
                'Error',
                error.code + ' ' + error.message,
                [{text: 'OK'}],
                {
                  cancelable: false,
                },
              );
            });
        })
        .catch(error => {
          Alert.alert(
            'Error',
            error.code + ' ' + error.message,
            [{text: 'OK'}],
            {
              cancelable: false,
            },
          );
        });
    } else {
      Alert.alert('Error', 'Required fields must be filled', [{text: 'OK'}], {
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
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
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
