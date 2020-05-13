import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import {colors} from '../../../styles';
import {CommonActions} from '@react-navigation/native';
export default class PoliticalCompassInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
    };
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.titleFont}>
                {' '}
                What is the Political Compass?{' '}
              </Text>
            </View>
            <View>
              <Image
                style={{width: 350, height: 250, margin: 20}}
                source={require('../../../../res/images/PoliticalIdeologyChart.jpg')}
              />
            </View>
            <View style={styles.ideologyInfoContainer}>
              <Text>
                In social studies, a political ideology is a certain set of
                ethical ideals, principles, doctrines, myths or symbols of a
                social movement, institution, class or large group that explains
                how society should work and offers some political and cultural
                blueprint for a certain social order. A political ideology
                largely concerns itself with how to allocate power and to what
                ends it should be used. Some political parties follow a certain
                ideology very closely while others may take broad inspiration
                from a group of related ideologies without specifically
                embracing any one of them. The popularity of an ideology is in
                part due to the influence of moral entrepreneurs, who sometimes
                act in their own interests. Political ideologies have two
                dimensions: (1) goals: how society should be organized; and (2)
                methods: the most appropriate way to achieve this goal.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.sectionButtonContainer}
              onPress={() =>
                this.props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'Political Compass Landing',
                        params: {
                          userId: this.state.userId,
                        },
                      },
                    ],
                  }),
                )
              }>
              <Text style={styles.sectionButtonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.polWhite,
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  titleFont: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  sectionButtonContainer: {
    alignSelf: 'center',
    width: 200,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: colors.polBlue,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  sectionButtonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polWhite,
  },
  ideologyInfoContainer: {
    flex: 3,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 4,
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
});
