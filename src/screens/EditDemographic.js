import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import pol from '../api/apiConfig';

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
      incomeLevel: '',
      occupation: '',
      personalityType: '',
      politicalAffiliation: '',
      state: '',
      gender: '',
    };
  }

  componentDidMount() {
    this.getDemographic();
  }

  getDemographic = () => {
    pol.api
      .getDemographicById(this.props.route.params.user.demographicId)
      .then(response => {
        console.log(response);
        console.log(response.partyAffiliation);
        this.setState({
          partyAffiliation: response.partyAffiliation,
          martialStatus: response.maritalStatus,
          ageRange: response.ageRange,
          education: response.education,
          ethnicity: response.ethnicity,
          incomeLevel: response.incomeLevel,
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

  onPressOccupation = () => {
    this.props.navigation.navigate('Edit Occupation', {
      userId: this.state.userId,
      occupation: this.state.occupation,
      demographicId: this.state.demographicId,
    });
  };

  render() {
    return (
      <View>
        <ScrollView>
          <TouchableOpacity
            style={styles.dividers}
            onPress={() => this.onPressOccupation()}>
            <Text style={styles.headingTextStyle}>Occupation</Text>
            <Text style={styles.fieldTextStyle}>{this.state.occupation}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dividers}>
            <Text style={styles.headingTextStyle}>Political Affiliation</Text>
            <Text style={styles.fieldTextStyle}>
              {this.state.politicalAffiliation}
            </Text>
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
          <Text style={styles.headingTextStyle}>Age Range</Text>
          <TouchableOpacity>
            <Text style={styles.fieldTextStyle}>{this.state.ageRange}</Text>
          </TouchableOpacity>
          <Text style={styles.headingTextStyle}>Gender</Text>
          <TouchableOpacity>
            <Text style={styles.fieldTextStyle}>{this.state.gender}</Text>
          </TouchableOpacity>
          <Text style={styles.headingTextStyle}>Income Level</Text>
          <TouchableOpacity>
            <Text style={styles.fieldTextStyle}>{this.state.incomeLevel}</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={styles.submitButton}>
              <Text
                style={styles.submitButtonText}
                onPress={console.log(this.state.userId)}>
                {' '}
                Submit Changes{' '}
              </Text>
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
