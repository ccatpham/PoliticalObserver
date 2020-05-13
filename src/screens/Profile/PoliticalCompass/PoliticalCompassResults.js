import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
} from 'victory-native';
import pol from '../../../api/apiConfig';
import {colors} from '../../../styles';
export default class PoliticalCompassResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      econScore: this.props.route.params.econScore,
      socialScore: this.props.route.params.socialScore,
      politicalScore: this.props.route.params.politicalScore,
      userId: this.props.route.params.userId,
      hasTakenPoliticalTest: true,
      description: '',
    };
  }

  componentDidMount() {
    this.getIdeologyInformation();
  }

  getIdeologyInformation = () => {
    pol.api
      .getPoliticalIdeologyByName(this.state.politicalScore)
      .then(response => {
        this.setState({
          description: response.description,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsHeaderText}>
                {' '}
                You are a {this.state.politicalScore}
              </Text>
              <Text style={{textAlign: 'center'}}> Social Score: </Text>
              <Text style={{textAlign: 'center'}}>
                {this.state.socialScore}
              </Text>
              <Text style={{textAlign: 'center'}}> Econ Score: </Text>
              <Text style={{textAlign: 'center'}}>{this.state.econScore}</Text>
            </View>
            <View>
              <View style={styles.chartContainer}>
                <VictoryChart width={340} height={340}>
                  <VictoryAxis
                    crossAxis
                    width={340}
                    height={340}
                    domain={[-6, 6]}
                    theme={VictoryTheme.material}
                    offsetY={170}
                    standalone={false}
                  />
                  <VictoryAxis
                    dependentAxis
                    crossAxis
                    width={340}
                    height={340}
                    domain={[-6, 6]}
                    theme={VictoryTheme.material}
                    offsetX={170}
                    standalone={false}
                  />
                  <VictoryScatter
                    style={{data: {fill: '#c43a31'}}}
                    size={7}
                    data={[
                      {
                        x: Number(this.state.econScore),
                        y: Number(this.state.socialScore),
                      },
                    ]}
                  />
                </VictoryChart>
              </View>
              <View style={styles.ideologyModuleContainer}>
                <Text style={styles.ideologyHeadingText}>
                  {this.state.politicalScore}
                </Text>
                <Text style={styles.descriptionStyle}>
                  {this.state.description}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.sectionButtonContainer}
                onPress={() =>
                  this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'Profile',
                          params: {
                            socialScore: this.state.socialScore,
                            econScore: this.state.econScore,
                            politicalScore: this.state.politicalScore,
                            hasTakenPoliticalTest: this.state
                              .hasTakenPoliticalTest,
                          },
                        },
                      ],
                    }),
                  )
                }>
                <Text style={styles.sectionButtonText}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.polWhite,
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.polWhite,
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
    margin: 20,
  },
  sectionButtonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polWhite,
  },
  ideologyModuleContainer: {
    flex: 3,
    marginTop: 20,
    marginHorizontal: 20,
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
  chartContainer: {
    flex: 3,
    marginTop: 20,
    marginHorizontal: 20,
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
  resultsContainer: {
    flex: 3,
    marginTop: 20,
    marginHorizontal: 20,
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
  chartModuleContainer: {
    flex: 3,
    marginTop: 20,
    marginHorizontal: 20,
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
  ideologyHeadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 2,
  },
  descriptionStyle: {
    marginHorizontal: 10,
  },
  resultsHeaderText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContainer: {
    marginVertical: 10,
  },
});
