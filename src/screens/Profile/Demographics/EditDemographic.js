import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import pol from '../../../api/apiConfig';
import {colors} from '../../../styles';
import {Dropdown} from 'react-native-material-dropdown';

export default class EditDemographic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userId: this.props.route.params.userId,
      demographicId: this.props.route.params.demographicId,
      age: '',
      state: '',
      occupation: '',
      income: '',
      gender: '',
      maritalStatus: '',
      ethnicity: '',
      education: '',
      personalityType: '',
      partyAffiliation: '',
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
      personalityTypeData: [
        {
          value: 'INTJ',
        },
        {
          value: 'INTP',
        },
        {
          value: 'ENTJ',
        },
        {
          value: 'ENTP',
        },
        {
          value: 'INFJ',
        },
        {
          value: 'INFP',
        },
        {
          value: 'ENFJ',
        },
        {
          value: 'ENFP',
        },
        {
          value: 'ISTJ',
        },
        {
          value: 'ISFJ',
        },
        {
          value: 'ESTJ',
        },
        {
          value: 'ESFJ',
        },
        {
          value: 'ISTP',
        },
        {
          value: 'ISFP',
        },
        {
          value: 'ESTP',
        },
        {
          value: 'ESFP',
        },
      ],
      partyAffiliationData: [
        {
          value: 'Democrat',
        },
        {
          value: 'Republican',
        },
        {
          value: 'Libertarian',
        },
        {
          value: 'Green',
        },
        {
          value: 'Constitution',
        },
        {
          value: 'Unaligned',
        },
      ],
    };
  }

  componentDidMount() {
    pol.api
      .getDemographicById(this.state.demographicId)
      .then(response => {
        this.setState({
          partyAffiliation: response.partyAffiliation,
          maritalStatus: response.maritalStatus,
          education: response.education,
          ethnicity: response.ethnicity,
          occupation: response.occupation,
          income: response.income,
          personalityType: response.personalityType,
          politicalAffiliation: response.politicalAffiliation,
          state: response.state,
          gender: response.gender,
          age: response.age,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

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

  onChangeIncome(income) {
    this.setState({
      income: income,
    });
  }

  onChangeOccupation(occupation) {
    this.setState({
      occupation: occupation,
    });
  }

  onPressSubmit = () => {
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

    if (this.state.personalityType && this.state.personalityType !== '') {
      user.personalityType = this.state.personalityType;
    }

    if (this.state.partyAffiliation && this.state.partyAffiliation !== '') {
      user.partyAffiliation = this.state.partyAffiliation;
    }

    pol.api
      .modifyDemographic(this.state.demographicId, user)
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
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
                  value={this.state.age.toString()}
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
                value={this.state.gender}
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
                value={this.state.maritalStatus}
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
                value={this.state.ethnicity}
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
                value={this.state.education}
                data={this.state.educationData}
                onChangeText={value => this.setState({education: value})}
                itemCount={4}
              />
            </View>
            <View style={styles.textInputColContainer}>
              <View style={styles.textInputContainer}>
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
              <View style={styles.textInputContainer}>
                <Text style={styles.textInputHeaderText}>Yearly Income</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Yearly Income'}
                  placeholderTextColor={colors.polPlaceholderGray}
                  onChangeText={income => this.onChangeIncome(income)}
                  keyboardType={'numeric'}
                  value={this.state.income.toString()}
                />
              </View>
            </View>
            <View style={styles.dropDownRowContainer}>
              <Dropdown
                containerStyle={[styles.dropDownContainer, {marginRight: 5}]}
                label="Personality Type"
                labelFontSize={16}
                labelTextStyle={{fontWeight: 'bold'}}
                baseColor={colors.black}
                value={this.state.personalityType}
                data={this.state.personalityTypeData}
                onChangeText={value => this.setState({personalityType: value})}
                itemCount={4}
              />
              <Dropdown
                containerStyle={[styles.dropDownContainer, {marginLeft: 5}]}
                label="Party Affiliation"
                labelFontSize={16}
                labelTextStyle={{fontWeight: 'bold'}}
                baseColor={colors.black}
                value={this.state.partyAffiliation}
                data={this.state.partyAffiliationData}
                onChangeText={value => this.setState({partyAffiliation: value})}
                itemCount={4}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitButtonContainer}
            onPress={this.onPressSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
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
  textInputRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textInputColContainer: {
    flex: 1,
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
  submitButtonContainer: {
    alignSelf: 'center',
    width: 200,
    marginTop: 20,
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
  submitButtonText: {
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
});
