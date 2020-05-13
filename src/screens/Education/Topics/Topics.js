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

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      data: [],
    };
  }

  componentDidMount() {
    pol.api
      .getAllTopics()
      .then(topics => {
        this.setState({data: topics});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  renderItem = item => {
    let source = require('../../../../res/icons/capitolIcon.png');
    if (item.subCategory === 'Form of Government') {
      source = require('../../../../res/icons/govt.png');
    } else if (item.subCategory === 'Branch') {
      source = require('../../../../res/icons/balance.png');
    } else if (item.subCategory === 'Congress') {
      source = require('../../../../res/icons/capitolIcon.png');
    } else if (item.subCategory === 'Position') {
      source = require('../../../../res/icons/positionIcon.png');
    } else if (item.subCategory === 'Economic System') {
      source = require('../../../../res/icons/economicsIcon.png');
    } else if (item.category === 'Government') {
      source = require('../../../../res/icons/govt.png');
    } else if (item.category === 'Economics') {
      source = require('../../../../res/icons/economicsIcon.png');
    } else if (item.category === 'Voting') {
      source = require('../../../../res/icons/votingIcon.png');
    }

    return (
      <TouchableOpacity
        style={styles.itemButtonContainer}
        onPress={() => {
          this.props.navigation.navigate('Topic Details', {
            userId: this.state.userId,
            topicId: item.id,
          });
        }}>
        <View style={styles.imageContainer}>
          <Image source={source} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {item.title}
          </Text>
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
