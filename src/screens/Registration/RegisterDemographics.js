import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RadioButton from '../../components/RadioButton';
import {colors} from '../../styles';
import {Dropdown} from 'react-native-material-dropdown';

export default class RegisterDemographicsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.route.params.user,
      age: '',
      state: '',
      occupation: '',
      income: '',
      gender: null,
      maritalStatus: null,
      ethnicity: null,
      education: null,
      genderData: [
        {
          value: 'Male',
        },
        {
          value: 'Female',
        },
        {
          value: 'Other',
        },
      ],
      maritalStatusData: [
        {
          value: 'Married',
        },
        {
          value: 'Single',
        },
      ],
      ethnicityData: [
        {
          value: 'White',
        },
        {
          value: 'African American',
        },
        {
          value: 'Asian',
        },
        {
          value: 'Native American',
        },
        {
          value: 'Hispanic',
        },
        {
          value: 'Other',
        },
      ],
      educationData: [
        {
          value: 'None',
        },
        {
          value: 'Diploma',
        },
        {
          value: "Associate's",
        },
        {
          value: "Bachelor's",
        },
        {
          value: "Master's",
        },
        {
          value: 'Doctoral',
        },
      ],
    };
  }

  onPressContinue = () => {
    let user = this.state.user;

    if (this.state.age && this.state.age !== '') {
      user.age = Number(this.state.age);
    }

    if (this.state.state && this.state.state !== '') {
      user.state = this.state.state;
    }

    if (this.state.gender && this.state.gender !== '') {
      user.gender = this.state.gender;
    }

    if (this.state.maritalStatus && this.state.maritalStatus !== '') {
      user.maritalStatus = this.state.maritalStatus;
    }

    if (this.state.ethnicity && this.state.ethnicity !== '') {
      user.ethnicity = this.state.ethnicity;
    }

    if (this.state.education && this.state.education !== '') {
      user.education = this.state.education;
    }

    if (this.state.occupation && this.state.occupation !== '') {
      user.occupation = this.state.occupation;
    }

    if (this.state.income && this.state.income !== '') {
      user.income = Number(this.state.income);
    }

    this.props.navigation.navigate('Register Personality', {
      user: user,
    });
  };

  onPressSkip = () => {
    this.props.navigation.navigate('Register Personality', {
      user: this.state.user,
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Fill out your demographics</Text>
            </View>
            <View style={styles.textInputRowContainer}>
              <View style={styles.textInputContainer}>
                <Text style={styles.textInputHeaderText}>Age</Text>
                <TextInput
                  style={[styles.textInput, {marginRight: 5}]}
                  placeholder={'Age'}
                  placeholderTextColor={colors.polPlaceholderGray}
                  onChangeText={age => this.onChangeAge(age)}
                  keyboardType={'numeric'}
                  maxLength={3}
                  value={this.state.age}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.textInputHeaderText}>State</Text>
                <TextInput
                  style={[styles.textInput, {marginLeft: 5}]}
                  placeholder={'State'}
                  placeholderTextColor={colors.polPlaceholderGray}
                  onChangeText={state => this.onChangeState(state)}
                  autoCapitalize={'characters'}
                  maxLength={2}
                  value={this.state.state}
                />
              </View>
            </View>
            <View style={styles.dropDownRowContainer}>
              <Dropdown
                containerStyle={[styles.dropDownContainer, {marginRight: 5}]}
                label="Gender"
                labelFontSize={16}
                labelTextStyle={{fontWeight: 'bold'}}
                baseColor={colors.black}
                data={this.state.genderData}
                onChangeText={value => this.setState({gender: value})}
                itemCount={4}
              />
              <Dropdown
                containerStyle={[styles.dropDownContainer, {marginLeft: 5}]}
                label="Marital Status"
                labelFontSize={16}
                labelTextStyle={{fontWeight: 'bold'}}
                baseColor={colors.black}
                data={this.state.maritalStatusData}
                onChangeText={value => this.setState({maritalStatus: value})}
                itemCount={4}
              />
            </View>
            <View style={styles.dropDownRowContainer}>
              <Dropdown
                containerStyle={[styles.dropDownContainer, {marginRight: 5}]}
                label="Ethnicity"
                labelFontSize={16}
                labelTextStyle={{fontWeight: 'bold'}}
                baseColor={colors.black}
                data={this.state.ethnicityData}
                onChangeText={value => this.setState({ethnicity: value})}
                itemCount={4}
              />
              <Dropdown
                containerStyle={[styles.dropDownContainer, {marginLeft: 5}]}
                label="Education"
                labelFontSize={16}
                labelTextStyle={{fontWeight: 'bold'}}
                baseColor={colors.black}
                data={this.state.educationData}
                onChangeText={value => this.setState({education: value})}
                itemCount={4}
              />
            </View>
            <View style={styles.textInputRowContainer}>
              <View style={[styles.textInputContainer, {marginRight: 5}]}>
                <Text style={styles.textInputHeaderText}>Occupation</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Occupation'}
                  placeholderTextColor={colors.polPlaceholderGray}
                  onChangeText={occupation =>
                    this.onChangeOccupation(occupation)
                  }
                  value={this.state.occupation}
                />
              </View>
              <View style={[styles.textInputContainer, {marginLeft: 5}]}>
                <Text style={styles.textInputHeaderText}>Yearly Income</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Yearly Income'}
                  placeholderTextColor={colors.polPlaceholderGray}
                  onChangeText={income => this.onChangeIncome(income)}
                  keyboardType={'numeric'}
                  value={this.state.income}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.continueButtonContainer}
            onPress={this.onPressContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButtonContainer}
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
    margin: 20,
    padding: 10,
    backgroundColor: colors.polWhite,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  headerText: {
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
    marginTop: 10,
  },
  textInputHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  textInput: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  dropDownRowContainer: {
    flexDirection: 'row',
  },
  dropDownContainer: {
    flex: 1,
  },
  continueButtonContainer: {
    alignSelf: 'center',
    width: 200,
    marginTop: 20,
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
    color: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
