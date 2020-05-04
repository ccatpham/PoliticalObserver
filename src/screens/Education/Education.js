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
import issuesIcon from '../../../res/icons/issues.png';

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
            <View style={{flex: 1, backgroundColor: colors.paleGreen}} />
          </View>
          <View style={styles.contentView}>
            <Text>Issues</Text>
            <Text>View and vote on societies current issues!</Text>
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
            <View style={{flex: 1, backgroundColor: colors.paleGreen}} />
          </View>
          <View style={styles.contentView}>
            <Text>Politicians</Text>
            <Text>
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
            <View style={{flex: 1, backgroundColor: colors.paleGreen}} />
          </View>
          <View style={styles.contentView}>
            <Text>Topics</Text>
            <Text>
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
    backgroundColor: colors.polGray,
  },
  politiciansButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    marginBottom: 0,
    backgroundColor: colors.polGray,
  },
  topicsButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    backgroundColor: colors.polGray,
  },
  imageContainer: {
    flex: 1,
  },
  contentView: {
    flex: 2,
    padding: 10,
  },
});
