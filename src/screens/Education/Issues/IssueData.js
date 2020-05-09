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

export default class IssueData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      issueId: this.props.route.params.issueId,
      vote: this.props.route.params.vote,
      data: [],
      genderData: [],
      partyData: [
        {
          x: 'Democrat',
          y: 2,
        },
        {
          x: 'Republican',
          y: 8,
        },
        {
          x: 'Libertarian',
          y: 4,
        },
        {
          x: 'Green',
          y: 1,
        },
        {
          x: 'Constitution',
          y: 3,
        },
        {
          x: 'Unaligned',
          y: 2,
        },
        {
          x: 'Democrat',
          y: 9,
        },
        {
          x: 'Republican',
          y: 3,
        },
        {
          x: 'Libertarian',
          y: 1,
        },
        {
          x: 'Green',
          y: 1,
        },
        {
          x: 'Constitution',
          y: 1,
        },
        {
          x: 'Unaligned',
          y: 5,
        },
      ],
    };
  }

  componentDidMount() {
    this.getIssueStats();
    this.getIssueGenderStats();
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
              This graph depicts how the other users chose to vote on this
              particular issue.
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
          <VictoryPie
            data={data}
            // colorScale={['#', '#', '#', '#', '#', '#']}
            labelRadius={20}
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
      </View>
    );
  }

  render() {
    let data = [this.state.genderData, this.state.partyData];
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
    backgroundColor: colors.polGray,
  },
  resultsDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: colors.polGray,
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
});
