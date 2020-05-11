import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import pol from '../../../api/apiConfig';
import {colors} from '../../../styles';
import {Dropdown} from 'react-native-material-dropdown';
import {CommonActions} from '@react-navigation/native';

export default class EditDemographic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userId: this.props.route.params.user.id,
      demographicId: this.props.route.params.user.demographicId,
      partyAffiliation: '',
      maritalStatus: '',
      maritalValue: '',
      education: '',
      educationValue: '',
      ethnicity: '',
      ethnicityValue: '',
      occupation: '',
      personalityType: '',
      personalityTypeValue: '',
      politicalAffiliation: '',
      partyAffiliationValue: '',
      state: '',
      stateValue: '',
      gender: '',
      genderValue: '',
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
      maritalStatusData: [
        {
          value: 'Single',
        },
        {
          value: 'Married',
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
    };
  }

  componentDidMount() {
    this.getDemographic();
  }

  onChangePartyAffiliation(partyAffiliation) {
    this.setState({
      partyAffiliation: partyAffiliation,
    });
  }

  onChangeEthnicity(ethnicity) {
    this.setState({
      ethnicity: ethnicity,
    });
  }

  onChangeEducation(education) {
    this.setState({
      education: education,
    });
  }

  onChangePersonalityType(personalityType) {
    this.setState({
      personalityType: personalityType,
    });
  }

  onChangeMaritalStatus(maritalStatus) {
    this.setState({
      maritalStatus: maritalStatus,
    });
  }

  onChangeState(state) {
    this.setState({
      state: state,
    });
  }

  onChangeGender(gender) {
    this.setState({
      gender: gender,
    });
  }

  onPressUpdate = () => {
    let user = this.state.user;
    user.partyAffiliation = this.state.partyAffiliation;
    user.maritalStatus = this.state.maritalStatus;
    user.education = this.state.education;
    user.ethnicity = this.state.ethnicity;
    // user.occupation = this.state.occupation;
    user.personalityType = this.state.personalityType;
    user.politicalAffiliation = this.state.politicalAffiliation;
    user.state = this.state.state;
    user.gender = this.state.gender;
  };

  onPressSubmit = () => {
    this.onPressUpdate();
    pol.api
      .modifyDemographic(this.state.demographicId, this.state.user)
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      }),
    );
  };

  getDemographic = () => {
    pol.api
      .getDemographicById(this.props.route.params.user.demographicId)
      .then(response => {
        this.setState({
          partyAffiliation: response.partyAffiliation,
          maritalStatus: response.maritalStatus,
          education: response.education,
          ethnicity: response.ethnicity,
          // occupation: response.occupation,
          personalityType: response.personalityType,
          politicalAffiliation: response.politicalAffiliation,
          state: response.state,
          gender: response.gender,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  render() {
    var partyAffiliationChoices = this.state.partyAffiliationData;
    var ethnicityChoices = this.state.ethnicityData;
    var maritalChoices = this.state.maritalStatusData;
    var educationChoices = this.state.educationData;
    var genderChoices = this.state.genderData;
    var personalityTypeChoices = this.state.personalityTypeData;

    return (
      <View>
        <ScrollView>
          <View>
            <Text style={styles.headingTextStyle}>State</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={colors.gray}
              defaultValue={this.state.state}
              onChangeText={stateValue => this.onChangeState(stateValue)}
            />
          </View>
          <View style={styles.dividers}>
            <Text style={styles.headingTextStyle}>Party Affiliation</Text>
            <Dropdown
              value={this.state.partyAffiliation}
              data={partyAffiliationChoices}
              onChangeText={partyAffiliationValue => {
                this.onChangePartyAffiliation(partyAffiliationValue);
              }}
            />
          </View>
          <View style={styles.dividers}>
            <Text style={styles.headingTextStyle}>Ethnicity</Text>
            <Dropdown
              value={this.state.ethnicity}
              data={ethnicityChoices}
              onChangeText={ethnicityValue => {
                this.onChangeEthnicity(ethnicityValue);
              }}
            />
          </View>
          <View style={styles.dividers}>
            <Text style={styles.headingTextStyle}>Education</Text>
            <Dropdown
              value={this.state.education}
              data={educationChoices}
              onChangeText={educationValue => {
                this.onChangeEducation(educationValue);
              }}
            />
          </View>
          <View style={styles.dividers}>
            <Text style={styles.headingTextStyle}>Marital Status</Text>
            <Dropdown
              value={this.state.maritalStatus}
              data={maritalChoices}
              onChangeText={maritalValue => {
                this.onChangeMaritalStatus(maritalValue);
              }}
            />
          </View>
          <View style={styles.dividers}>
            <Text style={styles.headingTextStyle}>Personality Type</Text>
            <Dropdown
              value={this.state.personalityType}
              data={personalityTypeChoices}
              onChangeText={personalityTypeValue => {
                this.onChangePersonalityType(personalityTypeValue);
              }}
            />
          </View>
          <View style={styles.dividers}>
            <Text style={styles.headingTextStyle}>Gender</Text>
            <Dropdown
              value={this.state.gender}
              data={genderChoices}
              onChangeText={genderValue => {
                this.onChangeGender(genderValue);
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.onPressSubmit()}>
              <Text style={styles.submitButtonText}> Submit Changes </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 5,
  },
  dropDownContainerStyle: {
    marginLeft: 10,
  },
  fieldTextStyle: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 5,
  },
  shadowContainerColumn: {
    paddingVertical: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
  dividers: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
  submitButton: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 70,
    marginRight: 70,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
