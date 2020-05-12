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
    let source = require('../../../../res/icons/govt.png');
    if (this.state.subCategory === 'Form of Government') {
      source = require('../../../../res/icons/govt.png');
    } else if (this.state.subCategory === 'Branch') {
      source = require('../../../../res/icons/balance.png');
    } else if (this.state.subCategory === 'Congress') {
      source = require('../../../../res/icons/capitolIcon.png');
    } else if (this.state.subCategory === 'Position') {
      source = require('../../../../res/icons/speaker.png');
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={source}
                style={styles.image}
              />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{this.state.title}</Text>
                <Text style={styles.subTitleText}>{this.state.subCategory}</Text>
              </View>
              <View style={styles.informationContainer}>
                <Text style={styles.text}>{this.state.description}</Text>
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.text}>     {this.state.body}</Text>
              </View>
            </View>
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
  scrollView: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  contentContainer: {
    margin: 20,
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
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
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
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  detailsContainer: {
    flex: 1,
    margin: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  informationContainer: {
    flex: 1,
    marginVertical: 20,
  },
  biographyContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.polDarkGray,
  },
  text: {
    fontSize: 14,
  },
});
