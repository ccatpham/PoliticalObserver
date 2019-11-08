import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Login Screen</Text>
        <Button
          title="Dashboard"
          onPress={() =>
            this.props.navigation.reset(
              [NavigationActions.navigate({routeName: 'Dashboard'})],
              0,
            )
          }
        />
      </View>
    );
  }
}
