import React from 'react';
import {Alert, Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import pol from '../api/apiConfig';

export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    pol.api
      .getGenderDemographics()
      .then(response => {
        this.setState({data: response});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Dashboard Screen</Text>
        <VictoryPie data={this.state.data} />
      </View>
    );
  }
}
