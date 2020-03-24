import React from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import {colors} from '../styles';
//List Items
var CONTENT = [];
var CONTENT_VIEW = [];
export default class IssuesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      activeVotedSections: [],
      fetched: false,
    };
  }

  onPressVoteYes = () => {};

  onPressVoteNo = () => {};

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
          {'Description: ' + section.content}
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
          onPress={this.onPressVoteYes}>
          <Text style={styles.voteButtonText}>Vote Yes!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.voteNoButtonContainer}
          onPress={this.onPressVoteNo}>
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
          {'Date: ' + section.date}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Description: ' + section.content}
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
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Your Vote: ' + 'Yes'}
        </Animatable.Text>
      </Animatable.View>
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
        console.log(responseJson);
        var s = JSON.stringify(responseJson);
        var list = JSON.parse(s);
        for (var i = 0; i < list.length; i += 1) {
          var item = {
            title: list[i].title,
            date: list[i].date,
            content: list[i].description,
            pros: list[i].pros,
            cons: list[i].cons,
            notes: list[i].notes,
          };
          CONTENT.push(item);
        }
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
        async results => {
          //console.log("primary: ", results);
          var s = JSON.stringify(results);
          var obj = JSON.parse(s);
          for (var i = 0; i < obj.length; i += 1) {
            var issue = await this.getUserVotedIssueHelper(
              'http://10.0.2.2:3000/issues/id/',
              obj[i].issueId,
            );
            console.log(
              issue.title,
              ', voted: ',
              obj[i].vote,
              ', by: ',
              obj[i].username,
            );
          }
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

  componentDidMount = () => {
    //fetch all the political issues
    this.fetchAllIssues('http://10.0.2.2:3000/issues/all/');
    //fetch all the user-voted political issues for the logged in user
    this.getUserVotedIssues(
      'http://10.0.2.2:3000/userissues/username/myEmail@gmail.com',
    );
  };

  render() {
    const {activeSections, activeVotedSections} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vote on Political Issues</Text>
        <ScrollView contentContainerStyle={{paddingTop: 30}}>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={true}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
        <Text style={styles.title}>View Political Votes</Text>
        <ScrollView contentContainerStyle={{paddingTop: 30}}>
          <Accordion
            activeSections={activeVotedSections}
            sections={CONTENT}
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
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    padding: 5,
  },
  headerText: {
    backgroundColor: 'rgba(67, 142, 200, 1)',
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  votedHeaderText: {
    backgroundColor: 'rgba(95, 183, 162, 1)',
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  voteYesButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
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
    marginBottom: 40,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: 'rgba(206, 49, 49, 1)',
    width: 100,
    alignSelf: 'center',
  },
});
