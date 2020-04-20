import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {colors} from '../styles';

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
          <View style={styles.shadowContainerRow}>
            <TouchableOpacity onPress={() => this.onPressPolitician()}>
              <Image
                style={styles.imageStyle}
                source={require('../../res/icons/issues.png')}
              />
              <Text style={styles.captionStyle}>Issues</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressTopic()}>
              <Image
                style={styles.imageStyle}
                source={require('../../res/icons/politician.png')}
              />
              <Text style={styles.captionStyle}>Politicians</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressIssue()}>
              <Image
                style={styles.imageStyle}
                source={require('../../res/icons/personality.png')}
              />
              <Text style={styles.captionStyle}>Personality</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.shadowContainerColumn}>
            <Text style={styles.profileTextStyle}>Political Compass</Text>
            <Image
              style={{
                width: 250,
                height: 250,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              source={require('../../res/images/political_spectrum.jpg')}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PoliticalCompassLanding')
              }>
              <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                Go to Quiz
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.shadowContainerColumn}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Election Starter Pack
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://voterstatus.sos.ca.gov/');
            }}
            style={styles.shadowContainerColumn}>
            <Text>1.) Check Your Voter Registration Status</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://covr.sos.ca.gov/');
            }}
            style={styles.shadowContainerColumn}>
            <Text>2.) Register to vote </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shadowContainerColumn}>
            <Text>3.) Find what's on your ballot </Text>
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
    top: 0,
    left: 20,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  imageStyle: {
    width: 115,
    height: 115,
  },
});
