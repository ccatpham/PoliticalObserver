import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {VictoryAxis, VictoryPie} from 'victory-native';
import pol from '../../../api/apiConfig';
export default class DemographicInsights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      demographicId: this.props.route.params.user.demographicId,
      genderData: [],
      educationData: [],
      maritalData: [],
      ageData: [],
      maritalStatus: '',
      partyData: [],
      ageRange: '',
      partyAffiliation: '',
      education: '',
      ethnicity: '',
      incomeLevel: '',
      occupation: '',
      personalityType: '',
      politicalAffiliation: '',
      state: '',
      gender: '',
      maritalStat: 0,
    };
  }

  componentDidMount() {
    this.getDemographic();
    this.getGenderStats();
    this.getPartyStats();
    this.getEducationStats();
    this.getMaritalStats();
    this.getMaritalPercentage();
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
  getGenderStats() {
    pol.api
      .getGenderDemographics()
      .then(response => {
        this.setState({genderData: response});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  getMaritalStats() {
    pol.api
      .getMaritalDemographics()
      .then(response => {
        this.setState({maritalData: response});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  getMaritalPercentage() {
    pol.api
      .getMaritalDemographicsById(this.state.userId)
      .then(response => {
        this.setState({maritalStat: response.maritalStat.toFixed(2)});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  getPartyStats() {
    pol.api
      .getPartyDemographics()
      .then(response => {
        this.setState({partyData: response});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  getEducationStats() {
    pol.api
      .getEducationDemographics()
      .then(response => {
        console.log(response);
        this.setState({educationData: response});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.shadowContainerColumn}>
            <Text
              style={{alignSelf: 'center', fontWeight: 'bold', marginTop: 10}}>
              Age
            </Text>
            <View style={{marginHorizontal: 15, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <VictoryPie
                  width={300}
                  height={300}
                  data={this.state.genderData}
                  colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
                  labels={({datum}) =>
                    `${datum.y}` !== '0' ? `${datum.x}` : ''
                  }
                />
                <Text> You are within 30% of users in this gender group.</Text>
                <Text>{this.state.demographicId}</Text>
              </View>
            </View>
          </View>
          <View style={styles.shadowContainerColumn}>
            <Text
              style={{alignSelf: 'center', fontWeight: 'bold', marginTop: 10}}>
              Party Affiliation
            </Text>
            <View style={{marginHorizontal: 15, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <VictoryPie
                  width={300}
                  height={300}
                  data={this.state.partyData}
                  labelPosition="centroid"
                  labelRadius={20}
                  labels={({datum}) =>
                    `${datum.y}` !== '0' ? `${datum.x}` : ''
                  }
                  colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
                />
                <Text> You are within 30% of users in this age group.</Text>
                <Text>{this.state.demographicId}</Text>
              </View>
            </View>
          </View>
          <View style={styles.shadowContainerColumn}>
            <Text
              style={{alignSelf: 'center', fontWeight: 'bold', marginTop: 10}}>
              Marital
            </Text>
            <View style={{marginHorizontal: 15, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <VictoryPie
                  width={300}
                  height={300}
                  data={this.state.maritalData}
                  colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
                  labels={({datum}) =>
                    `${datum.y}` !== '0' ? `${datum.x}` : ''
                  }
                  labelRadius={20}
                />
                <Text>You are within {this.state.maritalStat}% of users.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  shadowContainerColumn: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
});
