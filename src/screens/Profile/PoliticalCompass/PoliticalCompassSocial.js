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
            'It’s natural for children to keep some secrets from their parents.\n',
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
                  this.state.userId,
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
