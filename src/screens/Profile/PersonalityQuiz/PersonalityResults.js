import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import pol from '../../../api/apiConfig';
import {colors} from '../../../styles';
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.headingTextStyle}>
                Personality Quiz Results
              </Text>
              <View style={styles.questionContainer}>
                <Text style={styles.subHeadingTextStyle}>
                  {' '}
                  Who is a {this.state.name} ({this.state.personalityScore})?
                </Text>
                <Text>{this.state.description}</Text>
                <Text />
              </View>
              <View style={styles.questionContainer}>
                <Text style={styles.subHeadingTextStyle}> Weaknesses </Text>
                <Text>{this.state.weaknesses}</Text>
                <Text />
              </View>
              <View style={styles.questionContainer}>
                <Text style={styles.subHeadingTextStyle}> Strengths </Text>
                <Text>{this.state.strengths}</Text>
                <Text />
              </View>
              <View style={styles.questionContainer}>
                <Text style={styles.subHeadingTextStyle}> Weaknesses </Text>
                <Text>{this.state.weaknesses}</Text>
              </View>
              <TouchableOpacity
                style={styles.sectionButtonContainer}
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
                <Text style={styles.sectionButtonText}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  optionButton: {
    backgroundColor: '#0984e3',
    width: '90%',
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  optionButtonFont: {
    left: '35%',
    fontSize: 30,
    color: '#f5f6fa',
  },
  questionBox: {
    marginLeft: 20,
    marginBottom: 10,
  },
  questionFont: {
    fontSize: 21,
    marginBottom: 7,
    color: '#2f3640',
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 3,
    marginTop: 20,
    marginHorizontal: 20,
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
    margin: 20,
  },
  sectionButtonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polWhite,
  },
});
