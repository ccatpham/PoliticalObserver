import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
} from 'victory-native';
export default class PoliticalCompassResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      econScore: this.props.route.params.econScore,
      socialScore: this.props.route.params.socialScore,
      userID: this.props.route.params.userID,
      hasTakenPoliticalTest: true,
    };
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Political Compass Results</Text>
        <Text> Social Score: </Text>
        <Text>{this.state.socialScore}</Text>
        <Text> Econ Score: </Text>
        <Text>{this.state.econScore}</Text>
        <View style={styles.container}>
          <VictoryChart width={400} height={400}>
            <VictoryAxis
              crossAxis
              width={400}
              height={400}
              domain={[-10, 10]}
              theme={VictoryTheme.material}
              offsetY={200}
              standalone={false}
            />
            <VictoryAxis
              dependentAxis
              crossAxis
              width={400}
              height={400}
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
                  x: this.state.socialScore,
                  y: this.state.econScore,
                },
              ]}
            />
          </VictoryChart>
        </View>
        <View>
          <TouchableOpacity
            style={styles.quizButton}
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
                        hasTakenPoliticalTest: this.state.hasTakenPoliticalTest,
                      },
                    },
                  ],
                }),
              )
            }>
            <Text style={styles.quizButtonText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  quizButton: {
    width: 150,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 70,
    marginRight: 70,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
  },
  quizButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
