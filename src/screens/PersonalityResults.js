import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';
export default class PersonalityResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalityType: this.props.route.params.personalityType,
      user: this.props.route.params.user,
      userId: this.props.route.params.user.id,
      hasTakenPersonalityTest: true,
    };
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Personality Quiz Results</Text>
        <Text> Personality Type: </Text>
        <Text>{this.state.personalityType}</Text>
        <View>
          <TouchableOpacity
            style={styles.quizButton}
            onPress={() =>
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Profile',
                      params: {
                        personalityType: this.state.personalityType,
                        hasTakenPersonalityTest: this.state.hasTakenPersonalityTest,
                      },
                    },
                  ],
                }),
              )
            }>
            <Text style={styles.quizButtonText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  quizButton: {
    width: 150,
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
  },
  quizButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
