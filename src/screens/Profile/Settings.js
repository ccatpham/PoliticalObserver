import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }
  onPressPolitician = () => {
    alert('hello');
  };

  render() {
    return (
      <ScrollView>
        <TouchableOpacity style={styles.shadowContainerColumn}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shadowContainerColumn}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shadowContainerColumn}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Notifications</Text>
        </TouchableOpacity>
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
