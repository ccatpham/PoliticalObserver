import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../styles';
import profilePicture from '../../res/images/profile_pic.jpg';
import book from '../../res/icons/book_filled.png';
import spectrum from '../../res/images/political_spectrum.jpg';
const DeviceWidth = Dimensions.get('window').width;

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView scrollEnabled={true}>
          <Text>Profile Screen</Text>
          <Button
            title="Settings"
            onPress={() =>
              this.props.navigation.navigate({routeName: 'Settings'})
            }
          />
          <View style={styles.topContainer}>
            <View style={styles.profileContainer}>
              <View>
                <Text style={styles.profileText}>Anne Smith</Text>
                <Text>Democrat</Text>
                <Text>Social Liberal</Text>
                <Text>INTP</Text>
              </View>
              <Image source={profilePicture} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'grey',
              }}>
              <View>
                <TouchableOpacity
                  style={{
                    width: DeviceWidth * 0.3,
                    height: DeviceWidth * 0.3,
                    marginBottom: 1,
                    backgroundColor: 'powderblue',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.squareText}>Issues</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: DeviceWidth * 0.3,
                    height: DeviceWidth * 0.3,
                    marginBottom: 1,
                    backgroundColor: 'skyblue',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.squareText}>Affiliations</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    width: DeviceWidth * 0.3,
                    height: DeviceWidth * 0.3,
                    marginBottom: 1,
                    marginLeft: 1,
                    backgroundColor: 'powderblue',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.squareText}>Personalities</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: DeviceWidth * 0.3,
                    height: DeviceWidth * 0.3,
                    marginBottom: 1,
                    marginLeft: 1,
                    backgroundColor: 'skyblue',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.squareText}>Demographics</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    width: DeviceWidth * 0.3,
                    height: DeviceWidth * 0.3,
                    marginBottom: 1,
                    marginLeft: 1,
                    backgroundColor: 'powderblue',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <TouchableOpacity
                  style={{
                    width: DeviceWidth * 0.3,
                    height: DeviceWidth * 0.3,
                    marginBottom: 1,
                    marginLeft: 1,
                    backgroundColor: 'skyblue',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
            </View>
              <Text style={styles.headerText}>Political Spectrum</Text>
              <Image source={spectrum} style={styles.spectrum}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    marginLeft: 10,
  },
  spectrum: {
    width: 350,
    height: 350,
  },
  notification: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
  },
  profileText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: 'bold',
  },
  squareText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
    headerText: {
        fontSize: 16,
        color: colors.black,
        fontWeight: 'bold',
    },
});
