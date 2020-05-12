import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import pol from '../../../api/apiConfig';
export default class PersonalityResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalityScore: this.props.route.params.personalityScore,
      user: this.props.route.params.user,
      userId: this.props.route.params.user.id,
      hasTakenPersonalityTest: true,
      name: '',
      description: '',
      strengths: '',
      weaknesses: '',
      stats: '',
    };
  }

  componentDidMount() {
    this.getPersonalityInfo();
  }

  getPersonalityInfo = () => {
    pol.api
      .getPersonalityByType(this.state.personalityScore)
      .then(response => {
        this.setState({
          name: response.name,
          description: response.description,
          strengths: response.strengths,
          weaknesses: response.weaknesses,
          stats: response.stats,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{margin: 20}}>
            <Text style={styles.headingTextStyle}>
              Personality Quiz Results
            </Text>
            <Text style={styles.subHeadingTextStyle}>
              {' '}
              Personality Type: {this.state.personalityScore}{' '}
            </Text>
            <Text style={styles.subHeadingTextStyle}> {this.state.name}</Text>
            <Text style={styles.subHeadingTextStyle}>
              {' '}
              Who is a {this.state.name} ({this.state.personalityScore})?
            </Text>
            <Text>{this.state.description}</Text>
            <Text />
            <Text style={styles.subHeadingTextStyle}> Weaknesses </Text>
            <Text>{this.state.weaknesses}</Text>
            <Text />
            <Text style={styles.subHeadingTextStyle}> Strengths </Text>
            <Text>{this.state.strengths}</Text>
            <Text />
            <Text style={styles.subHeadingTextStyle}> Weaknesses </Text>
            <Text>{this.state.weaknesses}</Text>
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
                            personalityScore: this.state.personalityScore,
                            hasTakenPersonalityTest: this.state
                              .hasTakenPersonalityTest,
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
        </ScrollView>
      </SafeAreaView>
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
  headingTextStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  subHeadingTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  quizButton: {
    width: 150,
    marginVertical: 30,
    padding: 15,
    marginHorizontal: 70,
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
