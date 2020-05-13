import React from 'react';
import {
  FlatList,
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

export default class IssuesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      data: [],
      isVotingHistory: this.props.route.params.isVotingHistory,
    };
  }

  componentDidMount() {
    if (this.state.isVotingHistory) {
      pol.api
        .getUsersIssues(this.state.userId)
        .then(response => {
          this.setState({data: response});
        })
        .catch(error => {
          Alert.alert(
            'Error',
            error.code + ' ' + error.message,
            [{text: 'OK'}],
            {
              cancelable: false,
            },
          );
        });
    } else {
      pol.api
        .getAllIssues()
        .then(issues => {
          this.setState({
            data: issues,
          });
        })
        .catch(error => {
          Alert.alert(
            'Error',
            error.code + ' ' + error.message,
            [{text: 'OK'}],
            {
              cancelable: false,
            },
          );
        });
    }
  }

  renderItem = item => {
    return (
      <TouchableOpacity
        style={styles.itemButtonContainer}
        onPress={() => {
          this.props.navigation.navigate('Issue Details', {
            userId: this.state.userId,
            issueId: item.id,
          });
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../res/icons/votingIcon.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.text} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
          extraData={true}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  listContainer: {
    paddingVertical: 10,
  },
  itemButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: colors.polWhite,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 37.5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    height: 75,
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 18,
  },
  text: {
    fontSize: 16,
  },
});
