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

export default class RegisterDemographicsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.route.params.user,
      age: '',
      state: '',
      occupation: '',
      income: '',
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
          label: 'African American',
          selected: false,
        },
        {
          label: 'Asian',
          selected: false,
        },
        {
          label: 'Native American',
          selected: false,
        },
        {
          label: 'Hispanic',
          selected: false,
        },
        {
          label: 'Other',
          selected: false,
        },
      ],
      education: [
        {
          label: 'None',
          selected: false,
        },
        {
          label: 'Diploma',
          selected: false,
        },
        {
          label: "Associate's",
          selected: false,
        },
        {
          label: "Bachelor's",
          selected: false,
        },
        {
          label: "Master's",
          selected: false,
        },
        {
          label: 'Doctoral',
          selected: false,
        },
      ],
    };
  }

  onPressContinue = () => {
    let user = this.state.user;
    user.age = Number(this.state.age);
    user.state = this.state.state;

    let genderChoice = this.state.genderChoices.find(choice => {
      return choice.selected === true;
    });
    user.gender = genderChoice.label;

    let maritalChoice = this.state.maritalStatus.find(choice => {
      return choice.selected === true;
    });
    user.maritalStatus = maritalChoice.label;

    let ethnicityChoice = this.state.ethnicity.find(choice => {
      return choice.selected === true;
    });
    user.ethnicity = ethnicityChoice.label;

    let educationChoice = this.state.education.find(choice => {
      return choice.selected === true;
    });
    user.education = educationChoice.label;

    this.props.navigation.navigate('Register Personality', {
      user: {user: user},
    });
  };

  onPressSkip = () => {
    this.props.navigation.navigate('Register Personality', {
      user: {user: this.state.user},
    });
  };

  onChangeAge(age) {
    this.setState({
      age: age,
    });
  }

  onChangeState(state) {
    this.setState({
      state: state,
    });
  }

  onChangeOccupation(occupation) {
    this.setState({
      occupation: occupation,
    });
  }

  onChangeIncome(income) {
    this.setState({
      income: income,
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
      gender: selectedGender,
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Fill out your demographics</Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.textInputRowContainer}>
              <View style={styles.textInputContainer}>
                <Text style={styles.textInputHeaderText}>Age</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Age'}
                  placeholderTextColor={colors.gray}
                  onChangeText={age => this.onChangeAge(age)}
                  keyboardType={'numeric'}
                  value={this.state.age}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.textInputHeaderText}>State</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'State'}
                  placeholderTextColor={colors.gray}
                  onChangeText={state => this.onChangeState(state)}
                  autoCapitalize={'characters'}
                  maxLength={2}
                  value={this.state.state}
                />
              </View>
            </View>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonHeaderText}>Gender</Text>
              <View
                style={styles.radioButtonRow}>
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
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonHeaderText}>Marital Status</Text>
              <View
                  style={styles.radioButtonRow}>
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
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonHeaderText}>Ethnicity</Text>
              <View
                  style={styles.radioButtonColumn}>
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
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonHeaderText}>Education</Text>
              <View
                  style={styles.radioButtonColumn}>
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
          </View>
          <View style={styles.textInputRowContainer}>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputHeaderText}>Occupation</Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={'Occupation'}
                  placeholderTextColor={colors.gray}
                  onChangeText={occupation => this.onChangeOccupation(occupation)}
                  value={this.state.occupation}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputHeaderText}>Yearly Income</Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={'Income Level'}
                  placeholderTextColor={colors.gray}
                  onChangeText={income => this.onChangeIncome(income)}
                  keyboardType={'numeric'}
                  value={this.state.income}
              />
            </View>
          </View>
          <TouchableOpacity
              style={styles.continueButtonContainer}
              onPress={this.onPressContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButtonContainer}
                            onPress={this.onPressSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </ScrollView>
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
  textInputRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textInputContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  textInputHeaderText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polBlue,
  },
  textInput: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polBlue,
    borderRadius: 5,
    backgroundColor: colors.polLightGray,
  },
  radioButtonContainer: {
    flex: 1,
    marginVertical: 5,
  },
  radioButtonHeaderText: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polBlue,
  },
  radioButtonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButtonColumn: {
    flex: 1,
  },
  continueButtonContainer: {
    alignSelf: 'center',
    width: 200,
    marginTop: 20,
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
  skipButtonContainer: {
    alignSelf: 'center',
    width: 100,
  },
  skipButtonText: {
    textAlign: 'center',
    marginVertical: 10,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polBlue,
  },
});
