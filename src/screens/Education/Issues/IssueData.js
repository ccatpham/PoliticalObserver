import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../styles';
import pol from '../../../api/apiConfig';

export default class IssueData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueId: this.props.route.params.issueId,
      data: [],
    };
  }

  componentDidMount() {}

  render() {
    return <SafeAreaView style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
});
