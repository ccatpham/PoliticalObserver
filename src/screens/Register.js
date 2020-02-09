import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Picker,
  Alert,
} from 'react-native';
import {colors} from '../styles';
import {NavigationActions} from 'react-navigation';
import auth from '@react-native-firebase/auth';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      age: '',
      party: '',
      martial: '',
    };
  }

  onPressLogin = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.props.navigation.reset(
            [NavigationActions.navigate({routeName: 'Dashboard'})],
            0,
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
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerText}>Sign up with your email.</Text>
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
            onChangeText={password => this.onChangePassword(password)}
            value={this.state.password}
          />
          <Picker
            mode={'dropdown'}
            selectedValue={this.state.party}
            onValueChange={itemValue => {
              if (itemValue != '0') {
                this.setState({party: itemValue});
              }
            }}>
            <Picker.Item label="Select a political affiliation" value="0" />
            <Picker.Item label="Democrat" value="Democrat" />
            <Picker.Item label="Republican" value="Republican" />
            <Picker.Item label="Libertarian" value="Libertarian" />
            <Picker.Item label="Green" value="Green" />
            <Picker.Item label="Constitution" value="Constitution" />
            <Picker.Item label="Unaligned" value="Unaligned" />
          </Picker>
          <Text style={styles.headerDescription}>
            Selecting a political party will help curate app content.
          </Text>
          <Picker
            mode={'dropdown'}
            selectedValue={this.state.age}
            onValueChange={itemValue => {
              if (itemValue != '0') {
                this.setState({age: itemValue});
              }
            }}>
            <Picker.Item label="Select Age Range" value="0" />
            <Picker.Item label="Under 18" value="Under 18" />
            <Picker.Item label="18-25" value="18-25" />
            <Picker.Item label="25-64" value="25-64" />
            <Picker.Item label="65 and over" value="65 and over" />
          </Picker>
          <Picker
            mode={'dropdown'}
            selectedValue={this.state.martialStatus}
            onValueChange={itemValue => {
              if (itemValue != '0') {
                this.setState({martialStatus: itemValue});
              }
            }}>
            <Picker.Item label="Select Martial Status" value="0" />
            <Picker.Item label="Single" value="Single" />
            <Picker.Item label="Married" value="Married" />
          </Picker>
        </ScrollView>
        <TouchableOpacity
          style={styles.signUpButtonContainer}
          onPress={this.onPressLogin}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
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
  scrollView: {
    marginHorizontal: 20,
  },
  headerText: {
    margin: 10,
    fontSize: 30,
    color: colors.black,
    fontWeight: 'bold',
  },
  headerDescription: {
    fontSize: 15,
    color: '#d3d3d3',
  },
  inputTitleText: {
    fontSize: 16,
    color: colors.paleGreen,
  },
  textInput: {
    fontSize: 16,
    color: colors.gray,
    alignSelf: 'center',
    paddingVertical: 10,
    borderBottomColor: colors.gray,
  },
  ageInput: {
    justifyContent: 'center',
    margin: 30,
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
});
