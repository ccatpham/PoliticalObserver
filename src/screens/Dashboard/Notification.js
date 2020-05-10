import React from 'react';
import {
  Alert,
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
      id: this.props.route.params.notificationId,
      data: [],
    };
  }

  componentDidMount() {
    pol.api
      .getNotificationById(this.state.id)
      .then(notification => {
        this.setState({
          data: notification,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  renderSection(section) {
    return (
        <View>
          <Text></Text>
        </View>
    );
  }

  renderSections() {
    return (
        <View>
          <Text></Text>
        </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.shadowContainerColumn}>
              <Text style={styles.notificationHeaderText}>
                {this.state.data.title}
              </Text>
              {this.renderSections}
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
