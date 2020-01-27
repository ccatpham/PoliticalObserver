import React from 'react';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView scrollEnabled={true}>
          <Text>Profile Screen</Text>
          <Button
            title="Settings"
            onPress={() =>
              this.props.navigation.navigate({routeName: 'Settings'})
            }
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
