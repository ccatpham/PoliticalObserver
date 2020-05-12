import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
} from 'victory-native';
import RadioButton from '../../components/RadioButton';
import {colors} from '../../styles';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import pol from '../../api/apiConfig';

export default class RegisterPoliticalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.route.params.user,
      partyAffiliations: [
        {
          label: 'Democrat',
          selected: false,
        },
        {
          label: 'Republican',
          selected: false,
        },
        {
          label: 'Libertarian',
          selected: false,
        },
        {
          label: 'Green',
          selected: false,
        },
        {
          label: 'Constitution',
          selected: false,
        },
        {
          label: 'Unaligned',
          selected: false,
        },
      ],
    };
  }

  onPressContinue = () => {
    let user = this.state.user;
    let partyAffiliationChoice = this.state.partyAffiliations.find(choice => {
      return choice.selected === true;
    });
    if (partyAffiliationChoice != null) {
      user.partyAffiliation = partyAffiliationChoice.label;
    }

    auth()
      .createUserWithEmailAndPassword(
        this.state.user.email.toLowerCase(),
        this.state.user.password,
      )
      .then(() => {
        pol.api
          .createUser(user)
          .then(user => {
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'TabNavigator', params: {user: user}}],
              }),
            );
          })
          .catch(error => {
            Alert.alert(
              'Error',
              error.code + ' ' + error.message,
              [{text: 'OK'}],
              {
                cancelable: false,
              },
            );
          });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  onPressSkip = () => {
    auth()
      .createUserWithEmailAndPassword(
        this.state.user.email.toLowerCase(),
        this.state.user.password,
      )
      .then(() => {
        pol.api
          .createUser(this.state.user)
          .then(user => {
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'TabNavigator', params: {user: user}}],
              }),
            );
          })
          .catch(error => {
            Alert.alert(
              'Error',
              error.code + ' ' + error.message,
              [{text: 'OK'}],
              {
                cancelable: false,
              },
            );
          });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  onPressPartyAffiliationRadioButton = selectedPartyAffiliation => {
    let partyAffiliationChoices = this.state.partyAffiliations;
    partyAffiliationChoices.forEach(function(partyAffiliation) {
      if (partyAffiliation === selectedPartyAffiliation) {
        partyAffiliation.selected = !partyAffiliation.selected;
      } else {
        partyAffiliation.selected = false;
      }
    });
    this.setState({
      partyAffiliations: partyAffiliationChoices,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                What is your political standing?
              </Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonHeaderText}>
                Party Affiliation
              </Text>
              <View style={styles.radioButtonColumn}>
                {this.state.partyAffiliations.map(partyAffiliation => (
                  <RadioButton
                    key={partyAffiliation.label}
                    selected={partyAffiliation.selected}
                    onPress={() =>
                      this.onPressPartyAffiliationRadioButton(partyAffiliation)
                    }
                    label={partyAffiliation.label}
                  />
                ))}
              </View>
            </View>
          </View>
          <VictoryChart width={400} height={400}>
            <VictoryAxis
              crossAxis
              width={200}
              height={200}
              domain={[-10, 10]}
              theme={VictoryTheme.material}
              offsetY={200}
              standalone={false}
            />
            <VictoryAxis
              dependentAxis
              crossAxis
              width={200}
              height={200}
              domain={[-10, 10]}
              theme={VictoryTheme.material}
              offsetX={200}
              standalone={false}
            />
            <VictoryScatter
              style={{data: {fill: '#c43a31'}}}
              size={7}
              data={[
                {
                  x: 0,
                  y: 0,
                },
              ]}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          target: 'data',
                          mutation: props => {
                            const fill = props.style && props.style.fill;
                            return fill === 'black'
                              ? null
                              : {style: {fill: 'black'}};
                          },
                        },
                        {
                          target: 'labels',
                          mutation: props => {
                            return props.text === 'clicked'
                              ? null
                              : {text: 'clicked'};
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </VictoryChart>
          <TouchableOpacity
            style={styles.continueButtonContainer}
            onPress={this.onPressContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButtonContainer}
            onPress={this.onPressSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
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
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    margin: 10,
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    flex: 1,
    marginVertical: 5,
  },
  radioButtonHeaderText: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polBlue,
  },
  radioButtonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButtonColumn: {
    flex: 1,
  },
  continueButtonContainer: {
    alignSelf: 'center',
    width: 200,
    marginTop: 20,
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
  continueButtonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skipButtonContainer: {
    alignSelf: 'center',
    width: 100,
  },
  skipButtonText: {
    textAlign: 'center',
    marginVertical: 10,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polBlue,
  },
});
