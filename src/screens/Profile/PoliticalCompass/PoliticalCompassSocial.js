import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import RadioButton from '../../Components/RadioButton';
import pol from '../../../api/apiConfig';
import {colors} from '../../../styles';

export default class PoliticalCompassSocial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          prompt:
            'Abortion, when the woman’s life is not threatened, should always be illegal.',
          number: 0,
          choices: [
            {
              label: 'Strongly Agree',
              selected: false,
            },
            {
              label: 'Agree',
              selected: false,
            },
            {
              label: 'Disagree',
              selected: false,
            },
            {
              label: 'Strongly Disagree',
              selected: false,
            },
          ],
        },
        {
          prompt:
            'Taxpayers should not be expected to prop up any theatres or museums that cannot survive on a commercial basis.',
          number: 1,
          choices: [
            {
              label: 'Strongly Agree',
              selected: false,
            },
            {
              label: 'Agree',
              selected: false,
            },
            {
              label: 'Disagree',
              selected: false,
            },
            {
              label: 'Strongly Disagree',
              selected: false,
            },
          ],
        },
        {
          prompt:
            'Although the electronic age makes official surveillance easier, only wrongdoers need to be worried.',
          number: 2,
          choices: [
            {
              label: 'Strongly Agree',
              selected: false,
            },
            {
              label: 'Agree',
              selected: false,
            },
            {
              label: 'Disagree',
              selected: false,
            },
            {
              label: 'Strongly Disagree',
              selected: false,
            },
          ],
        },
        {
          prompt: 'All authority should be questioned.',
          number: 3,
          choices: [
            {
              label: 'Strongly Agree',
              selected: false,
            },
            {
              label: 'Agree',
              selected: false,
            },
            {
              label: 'Disagree',
              selected: false,
            },
            {
              label: 'Strongly Disagree',
              selected: false,
            },
          ],
        },
        {
          prompt:
            'It’s natural for children to keep some secrets from their parents.',
          number: 4,
          choices: [
            {
              label: 'Strongly Agree',
              selected: false,
            },
            {
              label: 'Agree',
              selected: false,
            },
            {
              label: 'Disagree',
              selected: false,
            },
            {
              label: 'Strongly Disagree',
              selected: false,
            },
          ],
        },
        {
          prompt:
            'Our civil liberties are being excessively curbed in the name of counter-terrorism.',
          number: 5,
          choices: [
            {
              label: 'Strongly Agree',
              selected: false,
            },
            {
              label: 'Agree',
              selected: false,
            },
            {
              label: 'Disagree',
              selected: false,
            },
            {
              label: 'Strongly Disagree',
              selected: false,
            },
          ],
        },
      ],
      answers1: this.props.route.params.answers,
      answers2: [0, 0, 0, 0, 0, 0],
      socialScore: 0,
      econScore: 0,
      politicalScore: '',
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
    let answers = this.state.answers2; // create the copy of state array
    answers[questionNumber] = selection + 1; //new value
    this.setState({
      questions: questions,
      answers2: answers,
    });
  };

  calculateQuizScore = async (id, socialQuizAnswers, econQuizAnswers) => {
    const userObject = {
      userId: id,
      socialAnswers: socialQuizAnswers,
      econAnswers: econQuizAnswers,
    };
    await pol.api
      .createPoliticalQuiz(userObject)
      .then(response => {
        this.setState({
          socialScore: response.socialScore.toFixed(2),
          econScore: response.econScore.toFixed(2),
          politicalScore: response.politicalScore,
        });
        this.props.navigation.navigate('Political Compass Results', {
          socialScore: this.state.socialScore,
          econScore: this.state.econScore,
          politicalScore: this.state.politicalScore,
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
                    textStyle={{color: colors.black, marginTop: 2}}
                  />
                ))}
              </View>
            ))}
            <TouchableOpacity
              style={styles.sectionButtonContainer}
              onPress={() => {
                this.calculateQuizScore(
                  this.state.userId,
                  this.state.answers1,
                  this.state.answers2,
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
});
