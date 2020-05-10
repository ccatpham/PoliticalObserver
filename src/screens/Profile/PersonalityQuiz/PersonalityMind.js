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

export default class PersonalityMind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          prompt: 'You enjoy vibrant social events with lots of people.',
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
            'You often rely on other people to be the ones to start a conversation and keep it going.',
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
            'You rarely worry if you made a good impression on someone you met.',
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
      mindAnswers: [0, 0, 0],
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
    let answers = this.state.mindAnswers; // create the copy of state array
    answers[questionNumber] = selection - 1; //new value
    this.setState({
      questions: questions,
      answers: answers,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 30}}> Mind </Text>
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
                this.props.navigation.navigate('Personality Energy', {
                  mindAnswers: this.state.mindAnswers,
                  userId: this.state.userId,
                });
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
