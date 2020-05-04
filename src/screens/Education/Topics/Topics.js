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
    return (
      <TouchableOpacity
        style={styles.itemButtonContainer}
        onPress={() => {
          this.props.navigation.navigate('Topic Details', {
            topicId: item.id,
          });
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../res/images/politician.png')}
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
    marginVertical: 10,
    marginHorizontal: 20,
  },
  itemButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: colors.polGray,
  },
  imageContainer: {},
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
