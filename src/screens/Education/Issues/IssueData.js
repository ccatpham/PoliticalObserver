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
  FlatList,
} from 'react-native';
import {colors, colorsData} from '../../../styles';
import pol from '../../../api/apiConfig';
import {VictoryPie} from 'victory-native';

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
    this.getIssueData();
    this.getIssueGenderStats();
    this.getIssuePartyStats();
    this.getIssueEducationStats();
    this.getIssueEthnicityStats();
  }

  getIssueData() {
    pol.api
      .getIssueById(this.state.userId, this.state.issueId)
      .then(issueResponse => {
        let issue = issueResponse.issue;
        let votedInfo = issueResponse.votedInfo;
        this.setState({...issue, ...votedInfo, voting: false});
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
              parent: {
                shadowColor: colors.black,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
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
            innerRadius={50}
            labelRadius={20}
            padAngle={({datum}) => datum.y * 4}
            labels={() => ''}
            width={150}
            height={150}
            padding={0}
            style={{
              parent: {
                shadowColor: colors.black,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              labels: {
                fill: colors.polWhite,
                fontSize: 16,
                fontWeight: 'bold',
              },
            }}
          />
        </View>
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeaderText}>{item.category}</Text>
        <View style={styles.itemChartContainer}>
          <VictoryPie
            data={item}
            colorScale={colorsData[this.state.rightKey]}
            width={150}
            height={150}
            innerRadius={50}
            padAngle={1}
            labelRadius={20}
            labels={() => ''}
            padding={0}
            style={{
              parent: {
                shadowColor: colors.black,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              labels: {
                fontSize: 16,
                fontWeight: 'bold',
              },
            }}
          />
        </View>
        <View style={styles.itemKeyContainer}>
          <FlatList
            data={item.data}
            renderItem={({item, index}) => this.renderKey(item, index)}
            numColumns={4}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    let data = [
      this.state.genderData,
      this.state.partyData,
      this.state.educationData,
      this.state.ethnicityData,
    ];
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          {this.renderResultsView()}
          <View style={styles.chartsContainer}>
            <FlatList
              data={data}
              renderItem={({item, index}) => this.renderItem(item, index)}
            />
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
    marginVertical: 10,
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
    marginHorizontal: 20,
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
  itemContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
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
  itemHeaderText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemChartContainer: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemKeyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  keyColor: {
    marginRight: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  keyText: {
    textAlign: 'center',
  },
});
