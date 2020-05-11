import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {colors} from '../../styles';

export default class EducationScreen extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.issuesButtonContainer}
          onPress={() => {
            this.props.navigation.navigate('Issues', {
              userId: this.props.route.params.user.id,
            });
          }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../res/icons/issuesIcon.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Issues</Text>
            <Text style={styles.subTitleText}>
              View and vote on societies current issues!
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.politiciansButtonContainer}
          onPress={() => {
            this.props.navigation.navigate('Politicians', {
              userId: this.props.route.params.user.id,
            });
          }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../res/icons/politiciansIcon.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Politicians</Text>
            <Text style={styles.subTitleText}>
              Learn about the politicians that influence your every day!
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topicsButtonContainer}
          onPress={() => {
            this.props.navigation.navigate('Topics', {
              userId: this.props.route.params.user.id,
            });
          }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../res/icons/topicsIcon.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Topics</Text>
            <Text style={styles.subTitleText}>
              Learn about interesting topics, from governments to economics!
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  issuesButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    marginBottom: 0,
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
  politiciansButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    marginBottom: 0,
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
  topicsButtonContainer: {
    flex: 1,
    flexDirection: 'row',
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
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    tintColor: colors.black,
    margin: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitleText: {
    fontSize: 18,
  },
});
