import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
      econScore: 0,
      socialScore: 0,
    };
  }

  componentDidMount() {
    this.setState({
      econScore: this.props.route.params.econScore,
      socialScore: this.props.route.params.socialScore,
    });
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
});
