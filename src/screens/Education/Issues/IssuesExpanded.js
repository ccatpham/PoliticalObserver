import React from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import {SearchBar} from 'react-native-elements';
import {colors} from '../../../styles';
import pol from '../../../api/apiConfig';

export default class IssuesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      issues: [],
      VotedIssues: [],
      activeSections: [],
      activeVotedSections: [],
      search: '',
    };
  }

  componentDidMount = () => {
    this.fetchAllIssues();
    this.getUserVotedIssues();
  };

  updateSearch = search => {
    this.setState({search});
    if (search == '') {
      this.fetchAllIssues();
    }
  };

  getSearchResults = async keyword => {
    if (keyword != '') {
      await this.fetchFilteredIssues(keyword);
    }
  };

  //keeps a list of active/expanded issue items
  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  //keeps a list of active/expanded voted-issue items
  setVotedSections = sections => {
    this.setState({
      activeVotedSections: sections.includes(undefined) ? [] : sections,
    });
  };

  onPressVoteNo(issueId, userId) {
    this.addUserIssueVote(issueId, userId.toLowerCase(), 'no');
  }

  onPressVoteYes(issueId, userId) {
    this.addUserIssueVote(issueId, userId.toLowerCase(), 'yes');
  }

  addUserIssueVote(issueId, userId, vote) {
    let date =
      String(new Date().getMonth() + 1) +
      '-' +
      String(new Date().getDate()) +
      '-' +
      String(new Date().getFullYear());
    let voteData = {issueId: issueId, userId: userId, vote: vote, date: date};
    pol.api
      .createUserIssue(voteData)
      .then()
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  fetchAllIssues() {
    pol.api
      .getIssues(this.state.userId)
      .then(response => {
        this.setState({issues: response});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  fetchFilteredIssues(keyword) {
    pol.api
      .getIssueByKeyword(this.state.userId, keyword)
      .then(response => {
        this.setState({issues: response});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  getUserVotedIssues() {
    pol.api
      .getUserIssueByUserId(this.state.userId)
      .then(response => {
        this.setState({VotedIssues: response});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  //header of the Issues
  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  //content of the issue
  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Date: ' + section.date + '\n'}
          {'Issue Id: ' + section._id + '\n'}
          {'Description: ' + section.description + '\n'}
          {'Pros: ' + section.pros + '\n'}
          {'Cons: ' + section.cons + '\n'}
          {'Important Notes: ' + section.notes}
        </Animatable.Text>
        <TouchableOpacity
          style={styles.voteYesButtonContainer}
          onPress={async () => {
            await this.onPressVoteYes(section._id, this.state.userId);
            this.setState({
              activeVotedSections: [],
              VotedIssues: [],
              issues: [],
              activeSections: [],
            });
            this.getUserVotedIssues();
            this.fetchAllIssues();
          }}>
          <Text style={styles.voteButtonText}>Vote Yes!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.voteNoButtonContainer}
          onPress={async () => {
            await this.onPressVoteNo(section._id, this.state.userId);
            this.setState({
              activeVotedSections: [],
              VotedIssues: [],
              issues: [],
              activeSections: [],
            });
            this.getUserVotedIssues();
            this.fetchAllIssues();
          }}>
          <Text style={styles.voteButtonText}>Vote No!</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  //header of the Issue
  renderVotedHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.votedHeaderText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  //content of the issue
  renderVotedContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Description: ' + section.description + '\n'}
          {'Your Vote: ' + section.vote + '\n'}
          {'Date Voted: ' + section.date + '\n'}
          {'Pros: ' + section.pros + '\n'}
          {'Cons: ' + section.cons + '\n'}
          {'Total "yes" votes: ' + section.yes + '\n'}
          {'Total "no" votes: ' + section.no + '\n'}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const {activeSections, activeVotedSections} = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          noIcon
          lightTheme
          round
          icon={{type: 'font-awesome', name: 'search'}}
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
          containerStyle={styles.searchContainer}
          onSubmitEditing={() => {
            this.setState({activeVotedSections: [], issues: []});
            this.getSearchResults(this.state.search);
          }}
        />
        <Text style={styles.title}>Vote on Political Issues</Text>
        <ScrollView contentContainerStyle={{paddingTop: 5}}>
          <Accordion
            activeSections={activeSections}
            sections={this.state.issues}
            touchableComponent={TouchableOpacity}
            expandMultiple={true}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent.bind(this)}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
        <Text style={styles.title}>View Your Political Votes</Text>
        <ScrollView contentContainerStyle={{paddingTop: 5}}>
          <Accordion
            activeSections={activeVotedSections}
            sections={this.state.VotedIssues}
            touchableComponent={TouchableOpacity}
            expandMultiple={true}
            renderHeader={this.renderVotedHeader}
            renderContent={this.renderVotedContent.bind(this)}
            duration={400}
            onChange={this.setVotedSections}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    margin: 5,
    paddingTop: 10,
  },
  header: {
    padding: 5,
  },
  headerText: {
    backgroundColor: 'rgba(67, 142, 200, 1)',
    padding: 5,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  votedHeaderText: {
    backgroundColor: 'rgba(95, 183, 162, 1)',
    padding: 5,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 5,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectTitle: {
    fontSize: 12,
    fontWeight: '500',
    padding: 5,
  },
  voteYesButtonContainer: {
    marginTop: 15,
    marginBottom: 0,
    borderRadius: 15,
    borderWidth: 0,
    backgroundColor: 'rgba(58, 153, 68, 1)',
    width: 100,
    alignSelf: 'center',
  },
  voteButtonText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5,
    fontSize: 12,
    color: colors.white,
    overflow: 'hidden',
  },
  voteNoButtonContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 0,
    backgroundColor: 'rgba(206, 49, 49, 1)',
    width: 100,
    alignSelf: 'center',
  },
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 0,
    borderWidth: 0,
    margin: 0,
    height: 40,
  },
});
