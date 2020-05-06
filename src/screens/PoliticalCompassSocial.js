import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import RadioButton from './Components/RadioButton';
import pol from '../api/apiConfig';

export default class PoliticalCompassSocial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          prompt:
            'There is now a worrying fusion of information and entertainment.',
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
            'No one chooses his or her country of birth, so it’s foolish to be proud of it.',
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
            'Controlling inflation is more important than controlling unemployment.',
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
      ],
      answers1: this.props.route.params.answers,
      answers2: [0, 0, 0],
      socialScore: 0,
      econScore: 0,
      userID: this.props.route.params.userID,
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
      userID: id,
      socialAnswers: socialQuizAnswers,
      econAnswers: econQuizAnswers,
    };
    await pol.api
      .createQuiz(userObject)
      .then(response => {
        this.setState({socialScore: response.socialScore.toFixed(2)});
        this.setState({econScore: response.econScore.toFixed(2)});
        this.props.navigation.navigate('PoliticalCompassResults', {
          socialScore: this.state.socialScore,
          econScore: this.state.econScore,
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
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 30}}> Social </Text>
        <ScrollView>
          {this.state.questions.map(question => (
            <View style={styles.questionBox}>
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
                  textStyle={{color: '#f1c40f'}}
                />
              ))}
            </View>
          ))}
          <View style={styles.optionButton}>
            <TouchableOpacity
              onPress={() => {
                this.calculateQuizScore(
                  this.state.userID,
                  this.state.answers1,
                  this.state.answers2,
                );
              }}>
              <Text style={styles.optionButtonFont}> Next </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    margin: 20,
  },
  questionFont: {
    fontSize: 25,
    color: '#2f3640',
  },
});
