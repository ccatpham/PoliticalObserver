import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors, dateFormats} from '../../../styles';
import pol from '../../../api/apiConfig';
import {VictoryPie} from 'victory-native';

let moment = require('moment');

export default class IssueDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      id: this.props.route.params.issueId,
      title: '',
      description: '',
      pros: '',
      cons: '',
      notes: '',
      date: '',
      data: [],
      vote: null,
      voted: false,
      voting: false,
    };
  }

  componentDidMount() {
    pol.api
      .getIssueById(this.state.id)
      .then(issue => {
        this.setState({...issue});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  onPressVote(vote) {
    this.setState({voting: true});
    let voteText = "";
    if (this.state.vote) {
      voteText = 'yes';
    } else {
      voteText = 'no';
    }
    let voteData = {issueId: this.state.id, userId: this.state.userId, vote: voteText, date: new Date()};
    pol.api
        .createUserIssue(voteData)
        .then(userIssue => {
          this.setState({vote: vote, voted: true, voting: false});
        })
        .catch(error => {
          Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
            cancelable: false,
          });
        });
    // this.setState({
    //   data: [
    //     {
    //       x: 'Against',
    //       y: 30,
    //     },
    //     {
    //       x: 'For',
    //       y: 70,
    //     },
    //   ],
    // });
  }

  onPressViewData = () => {
    this.props.navigation.navigate('Issue Data', {
      userId: this.state.userId,
      vote: this.state.vote,
      issueId: this.state.id,
    });
  };

  renderResultsView() {
    return (
      <View style={styles.resultsContainer}>
        <View style={styles.resultsTitleContainer}>
          <Text style={styles.resultsTitleText}>Thank you for your vote</Text>
        </View>
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
                {this.state.vote ? 'For' : 'Against'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.viewDataButtonContainer}
              onPress={this.onPressViewData}>
              <Text style={styles.viewDataText}>View Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderVoteView() {
    return (
      <View style={styles.voteContainer}>
        <Text style={styles.voteText}>VOTE</Text>
        <View style={styles.voteButtonsContainer}>
          <TouchableOpacity
            style={styles.voteForButton}
            onPress={() => this.onPressVote(true)}
            disabled={this.state.voting}>
            <Text style={styles.voteForText}>For</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.voteAgainstButton}
            onPress={() => this.onPressVote(false)}
            disabled={this.state.voting}>
          <Text style={styles.voteAgainstText}>Against</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{this.state.title}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>Description</Text>
              <Text style={styles.text}>{this.state.description}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>Pros</Text>
              <Text style={styles.text}>{this.state.pros}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>Cons</Text>
              <Text style={styles.text}>{this.state.cons}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>Notes</Text>
              <Text style={styles.text}>{this.state.notes}</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            {this.state.voted
              ? this.renderResultsView()
              : this.renderVoteView()}
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
  detailsContainer: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: colors.polGray,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionContainer: {
    flex: 1,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
  voteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voteText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  voteButtonsContainer: {
    flexDirection: 'row',
  },
  voteForButton: {
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.polGreen,
  },
  voteForText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.polWhite,
  },
  voteAgainstButton: {
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.polRed,
  },
  voteAgainstText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.polWhite,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsTitleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultsDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
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
  viewDataButtonContainer: {
    height: 40,
    width: 144,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.polBlue,
  },
  viewDataText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.polWhite,
  },
});
