import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {colors} from '../../styles';
import pol from '../../api/apiConfig';

export default class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.shadowContainerColumn}>
              <Text style={styles.notificationHeaderText}>
                Election Starter Pack
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://voterstatus.sos.ca.gov/');
                }}
                style={styles.shadowContainerColumn}>
                <Text style={styles.notificationSectionText}>
                  1.) Check Your Voter Registration Status.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://covr.sos.ca.gov/');
                }}
                style={styles.shadowContainerColumn}>
                <Text style={styles.notificationSectionText}>
                  2.) Register to vote.{' '}
                </Text>
                <Text style={styles.notificationText}>
                  Online must be done by October 15, 2020.
                </Text>
                <Text style={styles.notificationText}>
                  Mail-in must be postmarked by October 19, 2020
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shadowContainerColumn}>
                <Text style={styles.notificationSectionText}>
                  3.) View your voter information guide.{' '}
                </Text>
                <Text style={styles.notificationText}>
                  The Official Voter Information Guide for the November 3, 2020,
                  General Election will be available in September 2020.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.polWhite,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  contentContainer: {
    flex: 1,
    margin: 20,
  },
  shadowContainerColumn: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
  shadowContainerColumnElectionPack: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
  notificationHeaderText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationSectionText: {
    fontWeight: 'bold',
  },
  notificationText: {},
});
