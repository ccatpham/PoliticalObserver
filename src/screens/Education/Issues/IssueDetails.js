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
      vote: false,
      voted: false,
      voting: true,
    };
  }

  componentDidMount() {
    pol.api
      .getIssueById(this.state.userId, this.state.id)
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

  onPressVote(vote) {
    this.setState({voting: true});
    let voteText = '';
    if (vote) {
      voteText = 'yes';
    } else {
      voteText = 'no';
    }
    pol.api
      .createUserIssue({
        issueId: this.state.id,
        userId: this.state.userId,
        vote: voteText,
      })
      .then(userIssueResponse => {
        let issue = userIssueResponse.issue;
        let votedInfo = userIssueResponse.votedInfo;
        this.setState({...issue, ...votedInfo, voting: false});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  onPressViewData = () => {
    this.props.navigation.navigate('Issue Data', {
      userId: this.state.userId,
      vote: this.state.vote,
      issueId: this.state.id,
      issueTitle: this.state.title,
      issueDescription: this.state.description,
    });
  };

  renderResultsView() {
    return (
      <View style={styles.resultsContainer}>
        <View style={styles.resultsTitleContainer}>
          <Text style={styles.resultsTitleText}>Thank you for your vote!</Text>
        </View>
        <View style={styles.resultsDetailsContainer}>
          <View style={styles.resultsChartContainer}>
            <VictoryPie
              data={this.state.data}
              colorScale={[colors.polRed, colors.polGreen]}
              labelRadius={20}
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
            <Text style={styles.voteForText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.voteAgainstButton}
            onPress={() => this.onPressVote(false)}
            disabled={this.state.voting}>
            <Text style={styles.voteAgainstText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.detailsContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{this.state.title}</Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Description</Text>
                <View style={styles.sectionTextContainer}>
                  <Text style={styles.text}>{this.state.description}</Text>
                </View>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Pros</Text>
                <View style={styles.sectionTextContainer}>
                  <Text style={styles.text}>{this.state.pros}</Text>
                </View>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Cons</Text>
                <View style={styles.sectionTextContainer}>
                  <Text style={styles.text}>{this.state.cons}</Text>
                </View>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Notes</Text>
                <View style={styles.sectionTextContainer}>
                  <Text style={styles.text}>{this.state.notes}</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              {this.state.voted
                ? this.renderResultsView()
                : this.renderVoteView()}
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
    backgroundColor: colors.polWhite,
  },
  scrollView: {
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
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionContainer: {
    flex: 1,
    paddingTop: 10,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTextContainer: {
    flex: 1,
    paddingTop: 4,
    paddingHorizontal: 10,
    paddingBottom: 10,
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
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  voteForText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.polWhite,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  voteAgainstButton: {
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.polRed,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  voteAgainstText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.polWhite,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    marginVertical: 10,
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
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewDataText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.polWhite,
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
