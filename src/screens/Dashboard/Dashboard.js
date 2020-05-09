import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {VictoryPie} from 'victory-native';
import {colors} from '../../styles';
import pol from '../../api/apiConfig';

export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  renderDashboardModule() {
    return (
      <TouchableOpacity style={styles.dashboardModuleContainer}>
        <Text>2020 Presidential Election</Text>
        <View />
      </TouchableOpacity>
    );
  }

  renderNotifications() {
    return (
      <TouchableOpacity
        style={styles.notificationsContainer}
        onPress={() => this.props.navigation.navigate('Notification')}>
        <View style={styles.notificationsHeaderContainer}>
          <Text style={styles.notificationsHeaderText}>
            Election Incoming! Register to vote!
          </Text>
        </View>
        <Text style={styles.notificationsViewText}>View Notification ></Text>
      </TouchableOpacity>
    );
  }

  renderData() {
    return (
      <TouchableOpacity
        style={styles.dataContainer}
        onPress={() => this.props.navigation.navigate('Compare Data')}>
        <View>
          <Text>Compare Data</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {this.renderDashboardModule()}
          {this.renderNotifications()}
          {this.renderData()}
        </View>
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
  dashboardModuleContainer: {
    flex: 3,
    backgroundColor: colors.polGray,
  },
  notificationsContainer: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: colors.polGray,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: colors.polGray,
  },
});
