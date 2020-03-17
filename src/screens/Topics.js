import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {colors} from '../styles';

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Topics Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    color: colors.black,
    fontWeight: 'bold',
  },
});
