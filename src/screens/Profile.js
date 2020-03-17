import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import alert from '../../res/icons/exclamation.png';
import compass from '../../res/images/political_spectrum.jpg';
import {colors} from '../styles';
import profilePicture from '../../res/images/profile_pic.jpg';
import book from '../../res/icons/book_filled.png';
import spectrum from '../../res/images/political_spectrum.jpg';
const DeviceWidth = Dimensions.get('window').width;

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressPolitician = () => {
    alert('hello');
  };
  onPressIssue = () => {
    this.props.navigation.navigate('Issue');
  };
  onPressTopic = () => {
    this.props.navigation.navigate('Topic');
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.infoBox}>
          <Image
            style={styles.profileImageStyle}
            source={require('../../res/images/profile_pic.jpg')}
          />
          <Text style={styles.profileTextStyle}>Sally Hansen</Text>
          <View style={styles.descriptionStyle}>
            <Text> Democrat </Text>
            <Text> Social Liberal </Text>
            <Text> INTP </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shadowContainerRow}>
          <View style={{margin: 10, justifyContent: 'center'}}>
            <Text style={styles.profileTextStyle}>Completed</Text>
            <Text style={{color: 'gray'}}>5 tasks required</Text>
            <View style={{margin: 10}}>
              <ProgressCircle
                percent={30}
                radius={35}
                borderWidth={8}
                color="#1abc9c"
                shadowColor="#999"
                bgColor="#fff">
                <Text style={{fontSize: 18}}>{'30%'}</Text>
              </ProgressCircle>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => this.onPressPolitician()}>
              <Image
                style={styles.imageStyle}
                source={require('../../res/images/yang.jpg')}
              />
              <Text style={styles.captionStyle}>Issues</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressTopic()}>
              <Image
                style={styles.imageStyle}
                source={require('../../res/images/bernie.png')}
              />
              <Text style={styles.captionStyle}>Politicians</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressIssue()}>
              <Image
                style={styles.imageStyle}
                source={require('../../res/images/trump.jpg')}
              />
              <Text style={styles.captionStyle}>Personality</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 20}}>
          <TouchableOpacity style={styles.shadowContainerColumn}>
            <Text style={styles.profileTextStyle}>Political Compass</Text>
            <Image
              style={{
                width: 250,
                height: 250,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              source={require('../../res/images/political_spectrum.jpg')}
            ></Image>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: 'powderblue',
    alignItems: 'center',
    flex: 3,
    elevation: 10,
    position: 'relative',
    borderBottomWidth: 0,
  },
  descriptionStyle: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  profileImageStyle: {
    width: 120,
    height: 120,
    borderRadius: 200,
  },
  profileTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  iconContainer: {
    padding: 10,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  shadowContainerRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
  shadowContainerColumn: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
  captionStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    bottom: 0,
    top: 50,
    left: 25,
    right: 0,
    position: 'absolute',
    color: 'white',
  },
  imageStyle: {
    // aspectRatio: 1,
    width: 115,
    height: 115,
  },
  largeImageStyle: {
    // aspectRatio: 1,
    width: 200,
    height: 200,
  },
});
