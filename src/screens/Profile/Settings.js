import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../styles';
import pol from '../../api/apiConfig';
import {color} from 'react-native-reanimated';
import {CommonActions} from '@react-navigation/routers';
export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      userId: this.props.route.params.userId,
      settingsId: this.props.route.params.settingsId,
      dataSharing: false,
      pushNotifications: false,
      personalized: false,
      isSavingSettings: false,
    };
  }

  componentDidMount() {
    pol.api
      .getUserSettings(this.state.settingsId)
      .then(response => {
        this.setState({
          dataSharing: response.dataSharing,
          pushNotifications: response.pushNotifications,
          personalized: response.personalized,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  onPressDataSharing = () => {
    let settings = this.state.settings;
    settings.dataSharing = !this.state.dataSharing;

    pol.api
      .modifySettings(this.state.settingsId, settings)
      .then(response => {
        this.setState({
          dataSharing: response.dataSharing,
          pushNotifications: response.pushNotifications,
          personalized: response.personalized,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  onPressPushNotifications = () => {
    let settings = this.state.settings;
    settings.pushNotifications = !this.state.pushNotifications;

    pol.api
      .modifySettings(this.state.settingsId, settings)
      .then(response => {
        this.setState({
          dataSharing: response.dataSharing,
          pushNotifications: response.pushNotifications,
          personalized: response.personalized,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  onPressPersonalized = () => {
    let settings = this.state.settings;
    settings.personalized = !this.state.personalized;

    pol.api
      .modifySettings(this.state.settingsId, settings)
      .then(response => {
        this.setState({
          dataSharing: response.dataSharing,
          pushNotifications: response.pushNotifications,
          personalized: response.personalized,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  onPressLogout = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Landing'}],
      }),
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.settingsModuleContainer}>
              <View style={styles.settingsTextContainer}>
                <Text style={styles.settingsText}>Data Sharing</Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  trackColor={{
                    false: colors.polSettingsGray,
                    true: colors.polSettingsGreen,
                  }}
                  thumbColor={colors.polWhite}
                  onValueChange={dataSharing => {
                    this.setState({dataSharing});
                    this.onPressDataSharing();
                  }}
                  value={this.state.dataSharing}
                />
              </View>
            </View>
            <View style={styles.settingsModuleContainer}>
              <View style={styles.settingsTextContainer}>
                <Text style={styles.settingsText}>Push Notifications</Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  trackColor={{
                    false: colors.polSettingsGray,
                    true: colors.polSettingsGreen,
                  }}
                  thumbColor={colors.polWhite}
                  onValueChange={pushNotifications => {
                    this.setState({pushNotifications});
                    this.onPressPushNotifications();
                  }}
                  value={this.state.pushNotifications}
                />
              </View>
            </View>
            <View style={styles.settingsModuleContainer}>
              <View style={styles.settingsTextContainer}>
                <Text style={styles.settingsText}>Personalization</Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  trackColor={{
                    false: colors.polSettingsGray,
                    true: colors.polSettingsGreen,
                  }}
                  thumbColor={colors.polWhite}
                  onValueChange={personalized => {
                    this.setState({personalized});
                    this.onPressPersonalized();
                  }}
                  value={this.state.personalized}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.logoutButtonContainer}
            onPress={this.onPressLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
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
    flex: 1,
    margin: 20,
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
  settingsModuleContainer: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  switchContainer: {},
  logoutButtonContainer: {
    alignSelf: 'center',
    width: 200,
    marginBottom: 40,
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
  logoutButtonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
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
