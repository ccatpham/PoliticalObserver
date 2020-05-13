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
  Linking,
} from 'react-native';
import {colors, dateFormats} from '../../../styles';
import pol from '../../../api/apiConfig';

let moment = require('moment');

export default class IssueDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      id: this.props.route.params.politicianId,
      name: '',
      position: '',
      party: '',
      state: '',
      dateOfBirth: null,
      bio: '',
      address: '',
      phone: '',
      website: '',
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
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.imagesContainer}>
              <View style={[styles.imageContainer, {zIndex: 1}]}>
                {this.state.party === 'Democrat' && (
                  <Image
                    source={require('../../../../res/icons/democratIcon.png')}
                    style={styles.partyImage}
                  />
                )}
              </View>
              <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
              </View>
              <View style={[styles.imageContainer, {zIndex: 1}]}>
                {this.state.party === 'Republican' && (
                  <Image
                    source={require('../../../../res/icons/republicanIcon.png')}
                    style={styles.partyImage}
                  />
                )}
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{this.state.name}</Text>
                <Text
                  style={[
                    styles.subTitleText,
                    {color: colors.partyColors[this.state.party.toLowerCase()]},
                  ]}>
                  {this.state.position}
                </Text>
              </View>
              <Text style={styles.sectionText}>Information</Text>
              <View style={styles.informationContainer}>
                {this.state.party !== '' && (
                  <Text style={styles.text}>Party: {this.state.party}</Text>
                )}
                {dateOfBirth !== '' && (
                  <Text style={styles.text}>Born: {dateOfBirth}</Text>
                )}
                {this.state.state !== '' && (
                  <Text style={styles.text}>State: {this.state.state}</Text>
                )}
                {this.state.address !== '' && (
                  <Text style={styles.text}>Address: {this.state.address}</Text>
                )}
                {this.state.phone !== '' && (
                  <Text style={styles.text}>Phone: {this.state.phone}</Text>
                )}
                {this.state.website !== '' && (
                  <TouchableOpacity
                    style={styles.websiteButtonContainer}
                    onPress={() => Linking.openURL(this.state.website)}>
                    <Text style={styles.websiteButtonText}>Website</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.sectionText}>Biography</Text>
              <View style={styles.biographyContainer}>
                <Text style={styles.text}>{this.state.bio}</Text>
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
    margin: 10,
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
  partyImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  detailsContainer: {
    flex: 1,
    margin: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  informationContainer: {
    flex: 1,
    paddingTop: 4,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  websiteButtonContainer: {},
  websiteButtonText: {
    fontSize: 14,
    color: colors.polBlue,
  },
  biographyContainer: {
    flex: 1,
    paddingTop: 4,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
});
