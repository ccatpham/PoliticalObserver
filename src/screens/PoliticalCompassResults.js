import React from 'react';
import {Text, View} from 'react-native';

export default class PoliticalCompassResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      econScore: this.props.route.params.econScore,
      socialScore: this.props.route.params.socialScore,
    };
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Political Compass Results</Text>
        <Text> Social Score: </Text>
        <Text>{this.props.route.params.socialScore}</Text>
        <Text> Econ Score: </Text>
        <Text>{this.props.route.params.econScore}</Text>
      </View>
    );
  }
}
