import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import RadioButton from '../../Components/RadioButton';
import pol from '../../../api/apiConfig';
import {CommonActions} from '@react-navigation/native';
import {colors} from '../../../styles';

export default class PersonalityTactic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          prompt:
            'If you have to temporarily put your plans on hold, you make sure it is your top priority to get back on track as soon as possible.',
          number: 0,
          choices: [
            {
              label: 'Agree',
              selected: false,
            },
            {
              label: 'Neutral',
              selected: false,
            },
            {
              label: 'Disagree',
              selected: false,
            },
          ],
        },
        {
          prompt:
            'You are more of a detail-oriented than a big picture person.',
          number: 1,
          choices: [
            {
              label: 'Agree',
              selected: false,
            },
            {
              label: 'Neutral',
              selected: false,
            },
            {
              label: 'Disagree',
              selected: false,
            },
          ],
        },
        {
          prompt:
            'It would be a challenge for you to spend the whole weekend all by yourself without feeling bored.',
          number: 2,
          choices: [
            {
              label: 'Agree',
              selected: false,
            },
            {
              label: 'Neutral',
              selected: false,
            },
            {
              label: 'Disagree',
              selected: false,
            },
          ],
        },
      ],
      mindAnswers: this.props.route.params.mindAnswers,
      energyAnswers: this.props.route.params.energyAnswers,
      natureAnswers: this.props.route.params.natureAnswers,
      tacticAnswers: [0, 0, 0],
      personalityScore: '',
      userId: this.props.route.params.userId,
    };
  }

  onPressQuestRadioButton = (questionNumber, selection) => {
    let questions = this.state.questions;
    for (let i = 0; i < questions[questionNumber].choices.length; i++) {
      if (i === selection) {
        questions[questionNumber].choices[i].selected = !questions[
          questionNumber
        ].choices[i].selected;
      } else {
        questions[questionNumber].choices[i].selected = false;
      }
    }
    let answers = this.state.tacticAnswers; // create the copy of state array
    answers[questionNumber] = selection - 1; //new value
    this.setState({
      questions: questions,
      answers: answers,
    });
  };

  calculatePersonalityType = async (
    userId,
    mindAnswers,
    energyAnswers,
    natureAnswers,
    tacticAnswers,
  ) => {
    const userObject = {
      userId: userId,
      mindAnswers: mindAnswers,
      energyAnswers: energyAnswers,
      natureAnswers: natureAnswers,
      tacticAnswers: tacticAnswers,
    };
    await pol.api
      .createPersonalityQuiz(userObject)
      .then(response => {
        this.setState({personalityScore: response.personalityScore});
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Personality Results',
                params: {
                  personalityScore: this.state.personalityScore,
                  userId: this.state.userId,
                },
              },
            ],
          }),
        );
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
        <View style={styles.contentContainer}>
          <View style={styles.container}>
            {this.state.questions.map(question => (
              <View style={styles.questionContainer}>
                <Text style={styles.questionFont}>{question.prompt}</Text>
                {question.choices.map(choice => (
                  <RadioButton
                    key={choice.label}
                    selected={choice.selected}
                    onPress={() =>
                      this.onPressQuestRadioButton(
                        question.number,
                        question.choices.indexOf(choice),
                      )
                    }
                    label={choice.label}
                    colors={'#f1c40f'}
                    textStyle={{color: 'colors.black', marginTop: 2}}
                  />
                ))}
              </View>
            ))}
            <TouchableOpacity
              style={styles.sectionButtonContainer}
              onPress={() => {
                this.calculatePersonalityType(
                  this.state.userId,
                  this.state.mindAnswers,
                  this.state.energyAnswers,
                  this.state.natureAnswers,
                  this.state.tacticAnswers,
                );
              }}>
              <Text style={styles.sectionButtonText}> Submit </Text>
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
