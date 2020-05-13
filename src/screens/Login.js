import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
  Image,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {colors} from '../styles';
import auth from '@react-native-firebase/auth';
import pol from '../api/apiConfig';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
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
          <View style={styles.logoImageContainer}>
            <Image
              style={styles.logoImage}
              source={require('../../res/images/polLogo.png')}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={'Email'}
              placeholderTextColor={colors.polPlaceholderGray}
              onChangeText={email => this.onChangeEmail(email)}
              value={this.state.email}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Password'}
              placeholderTextColor={colors.polPlaceholderGray}
              onChangeText={password => this.onChangePassword(password)}
              value={this.state.password}
            />
          </View>
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
    alignItems: 'center',
    backgroundColor: colors.polWhite,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoImage: {
    width: 300,
    resizeMode: 'contain',
  },
  textInputContainer: {
    flex: 1,
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
});
