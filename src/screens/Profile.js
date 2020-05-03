import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
        <View>
          <View style={styles.shadowContainerColumn}>
            <Text style={styles.profileTextStyle}>Personality Quiz</Text>
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
          <Text style={styles.profileTextStyle}>Demographic</Text>
        </View>
        <View style={styles.shadowContainerColumn}>
          <Text style={styles.profileTextStyle}>Past Activity</Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PoliticalCompassLanding')
            }>
            <Text style={styles.quizButton}>View Voting History</Text>
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
    alignSelf: 'center',
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
