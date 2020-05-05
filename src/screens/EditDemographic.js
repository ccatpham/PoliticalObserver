import React from 'react';
import {Text, View, TextInput} from 'react-native';

export default class EditDemographic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Edit Demographics</Text>
        <TextInput
          label="Email"
          value={this.state.text}
          onChangeText={text => this.setState({text})}
        />
      </View>
    );
  }
}
