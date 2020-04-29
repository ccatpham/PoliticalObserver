import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import background from '../../res/images/landing_background.jpg';
export default class PoliticalCompassLanding extends React.Component {
  render() {
    return (
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.overlay} />
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.titleFont}> Political Compass Test </Text>
        </View>
        <View style={styles.descriptionStyle}>
          <Text style={styles.descriptionTextStyle}>
            Some propositions are extreme, and some are moderate. That’s how we
            can show you whether you lean towards extremism or moderation on the
            Compass. Your responses should not be overthought.
          </Text>
        </View>
        <View style={styles.startButtonStyle}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PoliticalCompassEconomic')
            }>
            <Text style={styles.startButtonFont}>Start the test</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <Text style={{color: '#f5f6fa', textDecorationLine: 'underline'}}>
            What is the political compass test?
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  titleFont: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f5f6fa',
  },
  startButtonStyle: {
    backgroundColor: '#0984e3',
    width: '90%',
    height: '10%',
    margin: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  startButtonFont: {
    justifyContent: 'center',
    left: '23%',
    fontSize: 30,
    color: '#f5f6fa',
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.2,
  },
  descriptionStyle: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    width: '90%',
    borderRadius: 15,
  },
  descriptionTextStyle: {
    color: '#f5f6fa',
    fontWeight: 'bold',
  },
});
