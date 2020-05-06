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
} from 'react-native';
import {colors} from '../../styles';
import {CommonActions} from '@react-navigation/native';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'wesley+nachos@gmail.com',
      password: '123456',
      confirmPassword: '123456',
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

    // if (this.state.email !== '' && this.state.password !== '') {
    //   auth()
    //     .createUserWithEmailAndPassword(
    //       this.state.email.toLowerCase(),
    //       this.state.password,
    //     )
    //     .then(() => {
    //       // let user = {
    //       //   email: this.state.email,
    //       //   age: this.state.age,
    //       //   age: this.state.age,
    //       //   age: this.state.age,
    //       //   age: this.state.age,
    //       //   age: this.state.age,
    //       //   age: this.state.age,
    //       //   age: this.state.age,
    //       //   age: this.state.age,
    //       //   age: this.state.age,
    //       // };
    //       pol.api
    //         .createUser(user)
    //         .then(() => {
    //           this.props.navigation.dispatch(
    //             CommonActions.reset({
    //               index: 1,
    //               routes: [{name: 'TabNavigator', params: {user: user}}],
    //             }),
    //           );
    //         })
    //         .catch(error => {
    //           Alert.alert(
    //             'Error',
    //             error.code + ' ' + error.message,
    //             [{text: 'OK'}],
    //             {
    //               cancelable: false,
    //             },
    //           );
    //         });
    //     })
    //     .catch(error => {
    //       Alert.alert(
    //         'Error',
    //         error.code + ' ' + error.message,
    //         [{text: 'OK'}],
    //         {
    //           cancelable: false,
    //         },
    //       );
    //     });
    // } else {
    //   Alert.alert('Error', 'Required fields must be filled', [{text: 'OK'}], {
    //     cancelable: false,
    //   });
    // }
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
              placeholderTextColor={colors.gray}
              onChangeText={email => this.onChangeEmail(email)}
              value={this.state.email}
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder={'Password'}
              placeholderTextColor={colors.gray}
              onChangeText={password => this.onChangePassword(password)}
              value={this.state.password}
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder={'Confirm Password'}
              placeholderTextColor={colors.gray}
              onChangeText={password => this.onChangeConfirmPassword(password)}
              value={this.state.confirmPassword}
            />
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
    color: colors.polBlue,
    borderRadius: 5,
    backgroundColor: colors.polLightGray,
  },
  continueButtonContainer: {
    alignSelf: 'center',
    width: 200,
    marginBottom: 40,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: colors.polBlue,
  },
  continueButtonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
});
