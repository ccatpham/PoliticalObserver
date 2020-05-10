import React from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import ListItem from '../../components/ListItem';
import sampleIcon from '../../../res/icons/issues.png';
import pol from '../../api/apiConfig';
let testUserId = '5eb721b12fb75c3a44410eda';
export default class VotedOnIssues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.user.id,
      demographicId: this.props.route.params.user.demographicId,
      VotedIssues: [],
    };
  }

  componentDidMount() {
    this.getUserVotedIssues();
  }

  getUserVotedIssues() {
    pol.api
      .getIssues(testUserId)
      .then(response => {
        this.setState({VotedIssues: response});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  renderItem = ({item}) => {
    return (
      <ListItem
        title={item.title}
        description={item.description}
        choice={item.vote}
        icon={sampleIcon}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <FlatList
            data={this.state.VotedIssues}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  shadowContainerColumn: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
});
