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

export default class EditDemographic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.user.id,
      demographicId: this.props.route.params.user.demographicId,
      partyAffiliation: '',
      martialStatus: '',
      ageRange: '',
      education: '',
      ethnicity: '',
      income: '',
      occupation: '',
      personalityType: '',
      politicalAffiliation: '',
      state: '',
      gender: '',
      politicalAffiliationValue: '',
      data: [],
      politicalAffiliationData: [
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
    this.getDemographic();
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

  getDemographic = () => {
    pol.api
      .getDemographicById(this.props.route.params.user.demographicId)
      .then(response => {
        this.setState({
          partyAffiliation: response.partyAffiliation,
          martialStatus: response.maritalStatus,
          ageRange: response.ageRange,
          education: response.education,
          ethnicity: response.ethnicity,
          income: response.income,
          occupation: response.occupation,
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

  // updateDemographic = () => {
  //   pol.api
  //     .modifyDemographic(this.state.demographicId, userObject)
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
  //         cancelable: false,
  //       });
  //     });
  // };

  render() {
    var politicalAffiliationChoices = this.state.politicalAffiliationData;
    return (
      <View>
        <ScrollView>
          <View>
            <Text style={styles.headingTextStyle}>Occupation</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Occupation'}
              placeholderTextColor={colors.gray}
              onChangeText={occupation => this.onChangeOccupation(occupation)}
              value={this.state.occupation}
            />
          </View>
          <TouchableOpacity style={styles.dividers}>
            <Text style={styles.headingTextStyle}>Political Affiliation</Text>
            <Dropdown
              value={this.state.politicalAffiliation}
              data={politicalAffiliationChoices}
              onChangeText={politicalAffiliationValue => {
                this.setState({politicalAffiliationValue});
                console.log(this.state.politicalAffiliationValue);
              }}
            />
          </TouchableOpacity>
          <Text style={styles.headingTextStyle}>Party Affiliation</Text>
          <TouchableOpacity>
            <Text style={styles.fieldTextStyle}>
              {this.state.partyAffiliation}
            </Text>
          </TouchableOpacity>
          <Text style={styles.headingTextStyle}>State</Text>
          <TouchableOpacity>
            <Text style={styles.fieldTextStyle}>{this.state.state}</Text>
          </TouchableOpacity>
          <Text style={styles.headingTextStyle}>Ethnicity</Text>
          <TouchableOpacity>
            <Text style={styles.fieldTextStyle}>{this.state.ethnicity}</Text>
          </TouchableOpacity>
          <Text style={styles.headingTextStyle}>Education</Text>
          <TouchableOpacity>
            <Text style={styles.fieldTextStyle}>{this.state.education}</Text>
          </TouchableOpacity>
          <Text style={styles.headingTextStyle}>Personality Type</Text>
          <TouchableOpacity>
            <Text style={styles.fieldTextStyle}>
              {this.state.personalityType}
            </Text>
          </TouchableOpacity>
          <Text style={styles.headingTextStyle}>Age</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Age'}
            placeholderTextColor={colors.gray}
            onChangeText={age => this.onChangeAge(age)}
            keyboardType={'numeric'}
            value={this.state.age}
          />
          <Text style={styles.headingTextStyle}>Gender</Text>
          <TouchableOpacity>
            <Text style={styles.fieldTextStyle}>{this.state.gender}</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.headingTextStyle}>Income Level</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Income Level'}
              placeholderTextColor={colors.gray}
              onChangeText={income => this.onChangeIncome(income)}
              keyboardType={'numeric'}
              value={this.state.income}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.submitButton}>
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
