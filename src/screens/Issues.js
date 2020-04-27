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
import {VictoryPie} from 'victory-native';

import {colors} from '../styles';
//List Items
var CONTENT = [];
var CONTENT_VOTE = [];
const USERNAME = 'myemail@gmail.com'; //this is a temporary value

export default class IssuesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      activeVotedSections: [],
      fetched: false,
      search: '',
    };
  }

  componentDidMount = () => {
    //fetch all the political issues
    this.fetchAllIssues('http://10.0.2.2:3000/issues/filter/all');
    //fetch all the user-voted political issues for the logged in user
    this.getUserVotedIssues(
      'http://10.0.2.2:3000/userissues/username/' + USERNAME,
    );
  };

  updateSearch = search => {
    this.setState({search});
  };

  getSearchResults = async keyword => {
    if (keyword == '') {
      keyword = 'all';
    }
    var url = 'http://10.0.2.2:3000/issues/filter/' + keyword;
    console.log(url);
    //fetch all the political issues with keyword in them
    await this.fetchAllIssues(url);
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

  onPressVoteNo(issueId, username) {
    this.addUserIssueVote(
      'http://10.0.2.2:3000/userissues/',
      issueId,
      username.toLowerCase(),
      'no',
    );
  }

  onPressVoteYes(issueId, username) {
    this.addUserIssueVote(
      'http://10.0.2.2:3000/userissues/',
      issueId,
      username.toLowerCase(),
      'yes',
    );
  }

  //add or update a new vote to issue by user
  addUserIssueVote(userIssueUrl, issueId, username, vote) {
    let date =
      String(new Date().getMonth() + 1) +
      '-' +
      String(new Date().getDate()) +
      '-' +
      String(new Date().getFullYear()); //Current Date
    fetch(userIssueUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        issueId: issueId,
        username: username,
        vote: vote,
        date: date,
      }),
    })
      .then(
        res => {
          return res.text();
        },
        exception => {
          console.log('exc1', exception);
        },
      )
      .then(
        restext => {
          if (restext == '1') {
            Alert.alert(
              'Already Voted!',
              'You have already voted once on this issue',
              [{text: 'OK'}],
              {
                cancelable: false,
              },
            );
          }
          console.log('restext: ', restext);
          // Do something with the returned data.
        },
        exception => {
          console.log('exc2', exception);
        },
      );
  }

  fetchAllIssues(url) {
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    })
      .then(
        response => {
          console.log('response1:', response);
          return response.json();
        },
        exception => {
          console.log('exception 1', exception);
        },
      )
      .then(responseJson => {
        CONTENT = responseJson;
        this.setState({
          fetched: true,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getUserVotedIssues(userIssuesUrl) {
    fetch(userIssuesUrl)
      .then(
        response => {
          return response.json();
        },
        exception => {
          console.log(exception);
        },
      )
      .then(
        results => {
          CONTENT_VOTE = results;
          this.setState({
            fetched: true,
          });
        },
        exception => {
          console.log(exception);
        },
      );
  }

  //gets an issue by issue id
  getUserVotedIssueHelper(url, issueId) {
    return fetch(url + issueId).then(
      response => {
        var res = response.json();
        return res;
      },
      exception => {
        console.log(exception);
      },
    );
  }

  //header of the Issue
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
          {'Date: ' + section.date}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Issue Id: ' + section._id}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Description: ' + section.description}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Pros: ' + section.pros}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Cons: ' + section.cons}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Important Notes: ' + section.notes}
        </Animatable.Text>
        <TouchableOpacity
          style={styles.voteYesButtonContainer}
          onPress={() => {
            this.onPressVoteYes(section._id, USERNAME);
            //this.setVotedSections(this.state.activeVotedSections);
            this.setState({activeVotedSections: []});
            CONTENT_VOTE = [];
            this.getUserVotedIssues(
              'http://10.0.2.2:3000/userissues/username/' + USERNAME,
            );
          }}>
          <Text style={styles.voteButtonText}>Vote Yes!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.voteNoButtonContainer}
          onPress={() => {
            this.onPressVoteNo(section._id, USERNAME);
            this.setState({activeVotedSections: []});
            CONTENT_VOTE = [];
            this.getUserVotedIssues(
              'http://10.0.2.2:3000/userissues/username/' + USERNAME,
            );
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
          {'Username: ' + section.username}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Date Voted: ' + section.date}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Your Vote: ' + section.vote}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Description: ' + section.description}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Pros: ' + section.pros}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Cons: ' + section.cons}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Total number of users who voted yes: ' + section.yes}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Total number of users who voted no: ' + section.no}
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
            this.setState({activeVotedSections: []});
            CONTENT = [];
            this.getSearchResults(this.state.search);
          }}
        />
        <Text style={styles.title}>Vote on Political Issues</Text>
        <ScrollView contentContainerStyle={{paddingTop: 5}}>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
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
            sections={CONTENT_VOTE}
            touchableComponent={TouchableOpacity}
            expandMultiple={true}
            renderHeader={this.renderVotedHeader}
            renderContent={this.renderVotedContent}
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
