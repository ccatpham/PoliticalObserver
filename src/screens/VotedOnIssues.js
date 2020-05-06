import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import ListItem from '../components/ListItem';
import sampleIcon from '../../res/icons/issues.png';
export default class VotedOnIssues extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <ListItem
            title={'Title'}
            description={'This is a sample description for a list item.'}
            choice={'no'}
            icon={sampleIcon}
          />
          <ListItem
            title={'Title'}
            description={
              'This is a sample description for a list item. This is' +
              'what happens if the description is a little long.' +
              'This is a sample description for a list item. This is' +
              'what happens if the description is a little long.' +
              'This is a sample description for a list item. This is' +
              'what happens if the description is a little long.'
            }
            choice={'no'}
            icon={sampleIcon}
          />
          <ListItem
            title={'Title'}
            description={
              'This is a sample description for a list item.' +
              'This is a sample description for a list item.' +
              'This is a sample description for a list item.' +
              'This is a sample description for a list item.' +
              ''
            }
            choice={'no'}
            icon={sampleIcon}
          />
          <ListItem
            title={'Title'}
            description={'This is a sample description for a list item.'}
            choice={'no'}
            icon={sampleIcon}
          />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
});
