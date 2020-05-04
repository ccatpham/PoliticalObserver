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

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  onPressPolitician = () => {
    alert("Temp placeholder to redirect to politician's analytics");
  };
  onPressIssue = () => {
    alert('Temp placeholder to redirect to interested issue analytics');
  };
  onPressTopic = () => {
    alert('Temp placeholder to redirect to interested topic analytics');
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.infoBox}>
          <View style={styles.descriptionStyle}>
            <Text> Democrat </Text>
            <Text> Social Liberal </Text>
            <Text> INTP </Text>
          </View>
        </View>
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
                source={require('../../res/icons/politiciansIcon.png')}
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
              <Text style={styles.quizButton}>Go to Quiz</Text>
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
            <Text style={{fontWeight: 'bold'}}>
              1.) Check Your Voter Registration Status.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://covr.sos.ca.gov/');
            }}
            style={styles.shadowContainerColumn}>
            <Text style={{fontWeight: 'bold'}}>2.) Register to vote. </Text>
            <Text>Online must be done by October 15, 2020.</Text>
            <Text>Mail-in must be postmarked by October 19, 2020</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shadowContainerColumn}>
            <Text style={{fontWeight: 'bold'}}>
              3.) View your voter information guide.{' '}
            </Text>
            <Text>
              The Official Voter Information Guide for the November 3, 2020,
              General Election will be available in September 2020.
            </Text>
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
  shadowContainerColumnElectionPack: {
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
  quizButton: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 70,
    marginRight: 70,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
