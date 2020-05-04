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
import {colors, dateFormats} from '../../../styles';
import pol from '../../../api/apiConfig';

let moment = require('moment');

export default class IssueDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.politicianId,
      name: '',
      position: '',
      party: '',
      state: '',
      dateOfBirth: null,
      bio: '',
    };
  }

  componentDidMount() {
    pol.api
      .getPoliticianById(this.state.id)
      .then(politician => {
        this.setState({...politician});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  render() {
    let image = require('../../../../res/images/politician.png');
    if (this.state.name === 'Bernie Sanders') {
      image = require('../../../../res/images/sanders.png');
    } else if (this.state.name === 'Donald Trump') {
      image = require('../../../../res/images/trump.jpg');
    } else if (this.state.name === 'Mike Pence') {
      image = require('../../../../res/images/pence.jpg');
    } else if (this.state.name === 'Joe Biden') {
      image = require('../../../../res/images/biden.jpg');
    }

    let dateOfBirth = '';
    if (this.state.dateOfBirth !== null) {
      dateOfBirth = moment(this.state.dateOfBirth).format(
        dateFormats.monthDayYear,
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
          <View style={styles.detailsContainer}>
            <Text>{this.state.name}</Text>
            <Text>{dateOfBirth}</Text>
            <Text>{this.state.position}</Text>
            <Text>{this.state.state}</Text>
            <Text>{this.state.party}</Text>
            <Text>{this.state.bio}</Text>
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
