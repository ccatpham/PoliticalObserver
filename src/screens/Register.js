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
import RadioButton from '../components/RadioButton';
import {colors} from '../styles';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import pol from '../api/apiConfig';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      age: '',
      occupation: '',
      income: '',
      state: '',
      politicalIdeology: '',
      genderChoices: [
        {
          label: 'Male',
          selected: false,
        },
        {
          label: 'Female',
          selected: false,
        },
        {
          label: 'Other',
          selected: false,
        },
      ],
      partyAffiliation: [
        {
          label: 'Democrat',
          selected: false,
        },
        {
          label: 'Republican',
          selected: false,
        },
        {
          label: 'Libertarian',
          selected: false,
        },
        {
          label: 'Green',
          selected: false,
        },
        {
          label: 'Constitution',
          selected: false,
        },
        {
          label: 'Unaligned',
          selected: false,
        },
      ],
      maritalStatus: [
        {
          label: 'Married',
          selected: false,
        },
        {
          label: 'Single',
          selected: false,
        },
      ],
      ethnicity: [
        {
          label: 'White',
          selected: false,
        },
        {
          label: 'Black or African American',
          selected: false,
        },
        {
          label: 'Asian',
          selected: false,
        },
        {
          label: 'American Indian or Alaskan Native',
          selected: false,
        },
        {
          label: 'Native Hawaiian or Other Pacific Islander',
          selected: false,
        },
        {
          label: 'Other',
          selected: false,
        },
      ],
      education: [
        {
          label: 'General Education Development',
          selected: false,
        },
        {
          label: 'High School Diploma',
          selected: false,
        },
        {
          label: "Associate's Degree",
          selected: false,
        },
        {
          label: "Bachelor's Degree",
          selected: false,
        },
        {
          label: "Master's Degree",
          selected: false,
        },
        {
          label: 'Doctoral Degree',
          selected: false,
        },
      ],
      incomeLevel: [
        {
          label: '1k-20k',
          selected: false,
        },
        {
          label: '41k-60k',
          selected: false,
        },
        {
          label: '61k-80k',
          selected: false,
        },
        {
          label: '81k-100k',
          selected: false,
        },
        {
          label: '101k-120k',
          selected: false,
        },
        {
          label: '121k-140k',
          selected: false,
        },
        {
          label: '141k-160k',
          selected: false,
        },
        {
          label: '161k-180k',
          selected: false,
        },
        {
          label: '181k-200k',
          selected: false,
        },
        {
          label: '200k-300k',
          selected: false,
        },
        {
          label: '300k-400k',
          selected: false,
        },
        {
          label: '400k-500k',
          selected: false,
        },
        {
          label: '500k-1m',
          selected: false,
        },
      ],
      personalityType: [
        {
          label: 'INTJ',
          selected: false,
        },
        {
          label: 'INTP',
          selected: false,
        },
        {
          label: 'ENTJ',
          selected: false,
        },
        {
          label: 'ENTP',
          selected: false,
        },
        {
          label: 'INFJA',
          selected: false,
        },
        {
          label: 'INFP',
          selected: false,
        },
        {
          label: 'ENFJ',
          selected: false,
        },
        {
          label: 'ENFP',
          selected: false,
        },
        {
          label: 'ISTJ',
          selected: false,
        },
        {
          label: 'ISFJ',
          selected: false,
        },
        {
          label: 'ESTJ',
          selected: false,
        },
        {
          label: 'ESFJ',
          selected: false,
        },
        {
          label: 'ISTP',
          selected: false,
        },
        {
          label: 'ISFP',
          selected: false,
        },
        {
          label: 'ESTP',
          selected: false,
        },
        {
          label: 'ESFP',
          selected: false,
        },
      ],
    };
  }

  onPressSignUp = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          // let user = {
          //   email: this.state.email,
          //   age: this.state.age,
          //   age: this.state.age,
          //   age: this.state.age,
          //   age: this.state.age,
          //   age: this.state.age,
          //   age: this.state.age,
          //   age: this.state.age,
          //   age: this.state.age,
          //   age: this.state.age,
          // };
          pol.api
            .createUser(user)
            .then(() => {
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'TabNavigator'}],
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

  onPressGenderRadioButton = selectedGender => {
    let genderChoices = this.state.genderChoices;
    genderChoices.forEach(function(gender) {
      if (gender === selectedGender) {
        gender.selected = !gender.selected;
      } else {
        gender.selected = false;
      }
    });
    this.setState({
      genderChoices: genderChoices,
    });
  };

  onPressPartyAffiliationRadioButton = selectedPartyAff => {
    let partyAffChoices = this.state.partyAffiliation;
    partyAffChoices.forEach(function(partyAff) {
      if (partyAff === selectedPartyAff) {
        partyAff.selected = !partyAff.selected;
      } else {
        partyAff.selected = false;
      }
    });
    this.setState({
      partyAffiliation: partyAffChoices,
    });
  };

  onPressMaritalStatusRadioButton = selectedMaritalStatus => {
    let maritalStatusChoices = this.state.maritalStatus;
    maritalStatusChoices.forEach(function(maritalStatus) {
      if (maritalStatus === selectedMaritalStatus) {
        maritalStatus.selected = !maritalStatus.selected;
      } else {
        maritalStatus.selected = false;
      }
    });
    this.setState({
      maritalStatus: maritalStatusChoices,
    });
  };

  onPressEthnicityRadioButton = selectedEthnicity => {
    let ethnicityChoices = this.state.ethnicity;
    ethnicityChoices.forEach(function(ethnicity) {
      if (ethnicity === selectedEthnicity) {
        ethnicity.selected = !ethnicity.selected;
      } else {
        ethnicity.selected = false;
      }
    });
    this.setState({
      ethnicity: ethnicityChoices,
    });
  };

  onPressEducationRadioButton = selectedEducation => {
    let educationChoices = this.state.education;
    educationChoices.forEach(function(education) {
      if (education === selectedEducation) {
        education.selected = !education.selected;
      } else {
        education.selected = false;
      }
    });
    this.setState({
      education: educationChoices,
    });
  };

  onPressIncomeLevelRadioButton = selectedIncomeLevel => {
    let incomeLevelChoices = this.state.incomeLevel;
    incomeLevelChoices.forEach(function(incomeLevel) {
      if (incomeLevel === selectedIncomeLevel) {
        incomeLevel.selected = !incomeLevel.selected;
      } else {
        incomeLevel.selected = false;
      }
    });
    this.setState({
      incomeLevel: incomeLevelChoices,
    });
  };

  onPressPersonalityTypeRadioButton = selectedPersonalityType => {
    let personalityTypeChoices = this.state.personalityType;
    personalityTypeChoices.forEach(function(personalityType) {
      if (personalityType === selectedPersonalityType) {
        personalityType.selected = !personalityType.selected;
      } else {
        personalityType.selected = false;
      }
    });
    this.setState({
      personalityType: personalityTypeChoices,
    });
  };

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
          <View>
            <Text>Gender</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {this.state.genderChoices.map(gender => (
                <RadioButton
                  key={gender.label}
                  selected={gender.selected}
                  onPress={() => this.onPressGenderRadioButton(gender)}
                  label={gender.label}
                />
              ))}
            </View>
          </View>
          <View>
            <Text>Party Affiliation</Text>
            <View style={{flex: 1}}>
              {this.state.partyAffiliation.map(partyAff => (
                <RadioButton
                  key={partyAff.label}
                  selected={partyAff.selected}
                  onPress={() =>
                    this.onPressPartyAffiliationRadioButton(partyAff)
                  }
                  label={partyAff.label}
                />
              ))}
            </View>
          </View>
          <View>
            <Text>Marital Status</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {this.state.maritalStatus.map(maritalStatus => (
                <RadioButton
                  key={maritalStatus.label}
                  selected={maritalStatus.selected}
                  onPress={() =>
                    this.onPressMaritalStatusRadioButton(maritalStatus)
                  }
                  label={maritalStatus.label}
                />
              ))}
            </View>
          </View>
          <View>
            <Text>Ethnicity</Text>
            <View style={{flex: 1}}>
              {this.state.ethnicity.map(ethnicity => (
                <RadioButton
                  key={ethnicity.label}
                  selected={ethnicity.selected}
                  onPress={() => this.onPressEthnicityRadioButton(ethnicity)}
                  label={ethnicity.label}
                />
              ))}
            </View>
          </View>
          <View>
            <Text>Highest Education</Text>
            <View style={{flex: 1}}>
              {this.state.education.map(education => (
                <RadioButton
                  key={education.label}
                  selected={education.selected}
                  onPress={() => this.onPressEducationRadioButton(education)}
                  label={education.label}
                />
              ))}
            </View>
          </View>
          <View>
            <Text>Income Level</Text>
            <View style={{flex: 1}}>
              {this.state.incomeLevel.map(incomeLevel => (
                <RadioButton
                  key={incomeLevel.label}
                  selected={incomeLevel.selected}
                  onPress={() =>
                    this.onPressIncomeLevelRadioButton(incomeLevel)
                  }
                  label={incomeLevel.label}
                />
              ))}
            </View>
          </View>
          <View>
            <Text>Personality Type</Text>
            <View style={{flex: 1}}>
              {this.state.personalityType.map(personalityType => (
                <RadioButton
                  key={personalityType.label}
                  selected={personalityType.selected}
                  onPress={() =>
                    this.onPressPersonalityTypeRadioButton(personalityType)
                  }
                  label={personalityType.label}
                />
              ))}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.signUpButtonContainer}
          onPress={this.onPressSignUp}>
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
