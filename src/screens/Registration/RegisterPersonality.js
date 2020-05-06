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
import RadioButton from '../../components/RadioButton';
import {colors} from '../../styles';
import {CommonActions} from '@react-navigation/native';

export default class RegisterPersonalityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.route.params.user,
    };
  }

  onPressContinue = () => {
    this.props.navigation.navigate('Register Political', {
      user: {user: this.state.user},
    });
  };

  onChangeEmail(email) {
    this.setState({
      email: email,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Fill out your demographics</Text>
            <Text>
              Your data will help us give you a deeper understand of where you
              are politically within society.
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={'Email'}
              placeholderTextColor={colors.gray}
              onChangeText={email => this.onChangeEmail(email)}
              value={this.state.email}
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
