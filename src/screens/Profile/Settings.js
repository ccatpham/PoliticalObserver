import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import {colors} from '../../styles';
import pol from '../../api/apiConfig';
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

  getSettings = () => {
    pol.api
      .getUserSettings(this.state.settingId)
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

  onPressDataSharing = () => {
    let settings = this.state.settings;
    console.log(this.state.dataSharing);
    settings.dataSharing = this.state.dataSharing;

    pol.api
      .modifySettings(this.state.settingId, settings)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  onPressPushNotifications = () => {
    let settings = this.state.settings;
    settings.pushNotifications = this.state.pushNotifications;

    pol.api
      .modifySettings(this.state.settingId, settings)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  onPressPersonalization = () => {
    let settings = this.state.settings;
    settings.personalization = this.state.personalization;

    pol.api
      .modifySettings(this.state.settingId, settings)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  componentDidMount() {
    console.log('setting id: ' + this.state.settingsId);
    this.getSettings();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.settingModuleContainer}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Data Sharing
                  </Text>
                </View>
                <View>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={this.state.dataSharing ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={dataSharing => {
                      this.setState({dataSharing});
                      this.onPressDataSharing();
                    }}
                    value={this.state.dataSharing}
                  />
                </View>
              </View>
            </View>
            <View style={styles.settingModuleContainer}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Push Notifications
                  </Text>
                </View>
                <View>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={
                      this.state.pushNotifications ? '#f5dd4b' : '#f4f3f4'
                    }
                    onValueChange={pushNotifications => {
                      this.setState({pushNotifications});
                      this.onPressPushNotifications();
                    }}
                    value={this.state.pushNotifications}
                  />
                </View>
              </View>
            </View>
            <View style={styles.settingModuleContainer}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Personalization
                  </Text>
                </View>
                <View>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={this.state.personalized ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={personalized => {
                      this.setState({personalized});
                      this.onPressPersonalization();
                    }}
                    value={this.state.personalized}
                  />
                </View>
              </View>
            </View>
          </View>
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
    marginHorizontal: 1,
  },
  settingModuleContainer: {
    marginVertical: 1,
    padding: 4,
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
});
