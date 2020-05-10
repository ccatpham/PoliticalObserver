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
export default class PoliticalCompassEconomic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          prompt:
            'If economic globalisation is inevitable, it should primarily serve humanity rather than the interests of trans-national corporations.',
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
            'I’d always support my country, whether it was right or wrong.',
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
            'Military action that defies international law is sometimes justified.',
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
      answers: [0, 0, 0],
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
    let answers = this.state.answers; // create the copy of state array
    answers[questionNumber] = selection + 1; //new value
    this.setState({
      questions: questions,
      answers: answers,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 30}}> Economy </Text>
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
                this.props.navigation.navigate('PoliticalCompassSocial', {
                  answers: this.state.answers,
                  userID: this.state.userID,
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
