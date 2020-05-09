import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors} from '../../../styles';
import pol from '../../../api/apiConfig';
import {VictoryPie} from 'victory-native';

const colorsGender = [
  '#CD6155',
  '#C0392B',
  '#A93226',
  '#52BE80',
  '#27AE60',
  '#229954',
];
const colorsParty = [
  '#CD6155',
  '#C0392B',
  '#A93226',
  '#922B21',
  '#7B241C',
  '#641E16',
  '#52BE80',
  '#27AE60',
  '#229954',
  '#1E8449',
  '#196F3D',
  '#145A32',
];
const colorsEducation = [
  '#CD6155',
  '#C0392B',
  '#A93226',
  '#922B21',
  '#7B241C',
  '#641E16',
  '#52BE80',
  '#27AE60',
  '#229954',
  '#1E8449',
  '#196F3D',
  '#145A32',
];
const colorsEthnicity = [
  '#CD6155',
  '#C0392B',
  '#A93226',
  '#922B21',
  '#7B241C',
  '#641E16',
  '#52BE80',
  '#27AE60',
  '#229954',
  '#1E8449',
  '#196F3D',
  '#145A32',
];
const titleGender = {title: 'Gender'};
const titleParty = {title: 'Party'};
const titleEducation = {title: 'Education'};
const titleEthnicity = {title: 'Ethnicity'};

export default class IssueData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      issueId: this.props.route.params.issueId,
      vote: this.props.route.params.vote,
      title: this.props.route.params.issueTitle,
      description: this.props.route.params.issueDescription,
      data: [],
      genderData: [],
      partyData: [],
      educationData: [],
      ethnicityData: [],
    };
  }

  componentDidMount() {
    this.getIssueStats();
    this.getIssueGenderStats();
    this.getIssuePartyStats();
    this.getIssueEducationStats();
    this.getIssueEthnicityStats();
  }

  getIssueStats() {
    pol.api
      .getStatsForOneIssue(this.state.issueId, this.state.userId)
      .then(response => {
        this.setState({data: response.data});
        this.setState({vote: response.uservote});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  getIssueGenderStats() {
    pol.api
      .getIssueDataGenderByIssueId(this.state.issueId)
      .then(response => {
        this.setState({genderData: response.gender});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  getIssuePartyStats() {
    pol.api
      .getIssueDataPartyByIssueId(this.state.issueId)
      .then(response => {
        this.setState({partyData: response.party});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  getIssueEducationStats() {
    pol.api
      .getIssueDataEducationByIssueId(this.state.issueId)
      .then(response => {
        this.setState({educationData: response.education});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  getIssueEthnicityStats() {
    pol.api
      .getIssueDataEthnicityByIssueId(this.state.issueId)
      .then(response => {
        this.setState({ethnicityData: response.ethnicity});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  renderResultsView() {
    return (
      <View style={styles.resultsDetailsContainer}>
        <View style={styles.resultsChartContainer}>
          <VictoryPie
            data={this.state.data}
            colorScale={[colors.polRed, colors.polGreen]}
            labelRadius={10}
            width={150}
            height={150}
            padding={0}
            style={{
              labels: {
                fill: colors.polWhite,
                fontSize: 16,
                fontWeight: 'bold',
              },
            }}
          />
        </View>
        <View style={styles.resultsInformationContainer}>
          <View style={styles.resultsDescriptionContainer}>
            <Text style={styles.resultsDescriptionText}>
              {this.state.title + ': \n'}
              {this.state.description}
            </Text>
          </View>
          <View style={styles.userVoteContainer}>
            <Text style={styles.userVoteText}>You Voted: </Text>
            <Text
              style={[
                styles.userVoteText,
                this.state.vote
                  ? {color: colors.polGreen}
                  : {color: colors.polRed},
              ]}>
              {this.state.vote}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderChartView(data) {
    return (
      <View style={styles.chartViewContainer}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>
            {data[2].title} division of yes and no votes.
          </Text>
          <VictoryPie
            data={data[0]}
            colorScale={data[1]}
            labelPosition="centroid"
            innerRadius={60}
            labelRadius={70}
            padAngle={({datum}) => datum.y * 4}
            labels={({datum}) => (`${datum.y}` !== '0' ? `${datum.x}` : '')}
            width={280}
            height={280}
            padding={20}
            style={{
              labels: {
                fill: 'black',
                fontSize: 12,
                fontWeight: 'bold',
              },
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    let data = [
      [this.state.genderData, colorsGender, titleGender],
      [this.state.partyData, colorsParty, titleParty],
      [this.state.educationData, colorsEducation, titleEducation],
      [this.state.ethnicityData, colorsEthnicity, titleEthnicity],
    ];
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          {this.renderResultsView()}
          <View style={styles.chartsContainer}>
            {data.map(data => this.renderChartView(data))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  chartsContainer: {
    flex: 1,
    marginVertical: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  resultsChartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  resultsInformationContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  resultsDescriptionContainer: {
    flex: 1,
  },
  resultsDescriptionText: {
    fontSize: 14,
  },
  userVoteContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  userVoteText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  chartTitle: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingTop: 10,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});
