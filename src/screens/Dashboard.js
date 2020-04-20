import React from 'react';
import {Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';

export default class DashboardScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Dashboard Screen</Text>
        <VictoryPie
          data={[{x: 'Cats', y: 35}, {x: 'Dogs', y: 40}, {x: 'Birds', y: 55}]}
        />
      </View>
    );
  }
}
