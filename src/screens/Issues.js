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

var item_date = 'March, 1, 2020';
var item_description =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';
var item_pro = 'Reasons to vote yes.';
var item_con = 'Reasons to Vote no.';
var item_notes = 'Here are some important and controvertial notes to consider.';

//List Items
var CONTENT = [
  {
    title: 'Issue 1',
    date: item_date,
    content: item_description,
    pro: item_pro,
    con: item_con,
    note: item_notes,
  },
  {
    title: 'Issue 2',
    date: item_date,
    content: item_description,
    pro: item_pro,
    con: item_con,
    note: item_notes,
  },
  {
    title: 'Issue 3',
    date: item_date,
    content: item_description,
    pro: item_pro,
    con: item_con,
    note: item_notes,
  },
  {
    title: 'Issue 4',
    date: item_date,
    content: item_description,
    pro: item_pro,
    con: item_con,
    note: item_notes,
  },
  {
    title: 'Issue 5',
    date: item_date,
    content: item_description,
    pro: item_pro,
    con: item_con,
    note: item_notes,
  },
];

export default class IssuesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      voted: 'not voted', //yes, no, none
    };
  }

  onPressVoteYes = () => {
    this.state.voted = 'voted yes';
  };

  onPressVoteNo = () => {
    this.state.voted = 'voted no';
  };

  //keeps a list of active (expanded issues)
  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  //header of the Issue
  renderHeader = (section, _, isActive) => {
    var status = this.state.voted;
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title + '  ' + status}</Text>
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
          {'Pros: ' + section.pro}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Cons: ' + section.con}
        </Animatable.Text>
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {'Important Notes: ' + section.note}
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

  render() {
    const {activeSections} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{paddingTop: 30}}>
          <Text style={styles.title}>Vote on Political Issues</Text>
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
