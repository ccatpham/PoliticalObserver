import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors} from '../../../styles';
import pol from '../../../api/apiConfig';

export default class TopicDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      id: this.props.route.params.topicId,
      title: '',
      category: '',
      subCategory: '',
      description: '',
      body: '',
    };
  }

  componentDidMount() {
    pol.api
      .getTopicById(this.state.id)
      .then(topic => {
        this.setState({...topic});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../../res/images/politician.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text>{this.state.title}</Text>
            <Text>{this.state.category}</Text>
            <Text>{this.state.subCategory}</Text>
            <Text>{this.state.description}</Text>
            <Text>{this.state.body}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: colors.polGray,
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
