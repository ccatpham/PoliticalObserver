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
      data: {},
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
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{section.sectionTitle}</Text>
        {section.sectionBody && (
          <Text style={styles.sectionBodyText}>{section.sectionBody}</Text>
        )}
        {section.sectionLink && (
          <TouchableOpacity
            style={styles.sectionButtonContainer}
            onPress={() => Linking.openURL(section.sectionLink)}>
            <Text style={styles.sectionButtonText}>
              {section.sectionLinkText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <Text style={styles.notificationHeaderText}>
              {this.state.data.title}
            </Text>
            {this.state.data.body &&
              this.state.data.body.map(section => this.renderSection(section))}
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
  notificationHeaderText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionBodyText: {
    marginBottom: 10,
    marginHorizontal: 20,
    fontSize: 14,
  },
  sectionButtonContainer: {
    alignSelf: 'center',
    width: 200,
    borderRadius: 20,
    borderWidth: 0,
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
  sectionButtonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polWhite,
  },
});
