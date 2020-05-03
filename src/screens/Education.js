import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default class EducationScreen extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Education Screen</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Issues');
          }}>
          <Text>Political Issues</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
