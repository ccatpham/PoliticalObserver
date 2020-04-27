import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import RadioButton from './Components/RadioButton';
export default class PoliticalCompassEconomic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizChoices1: [
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
      quizChoices2: [
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
      quizChoices3: [
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
      answers: [],
    };
  }

  onPressQuest1RadioButton = selectedAnswer => {
    let quizChoices1 = this.state.quizChoices1;
    let answer;
    quizChoices1.forEach(function(answer) {
      if (answer === selectedAnswer) {
        answer.selected = !answer.selected;
        console.log(selectedAnswer);
        if (selectedAnswer.label === 'Strongly Agree') {
          answer = 1;
          console.log('I"m in option strongly agree');
          console.log('answer: ' + answer);
        } else if (selectedAnswer.label === 'Agree') {
          answer = 2;
          console.log('I"m in option agree');
          console.log('answer: ' + answer);
        } else if (selectedAnswer.label === 'Disagree') {
          answer = 3;
          console.log('I"m in option disagree');
          console.log('answer: ' + answer);
        } else {
          answer = 4;
          console.log('I"m in option strongly disagree');
          console.log('answer: ' + answer);
        }
      } else {
        answer.selected = false;
      }
    });
    let answers = {...this.state.answers}; // create the copy of state array
    answers[1] = answer; //new value
    this.setState({
      quizChoices1: quizChoices1,
      answers: {answers},
    });
  };
  onPressQuest2RadioButton = selectedAnswer => {
    let quizChoices2 = this.state.quizChoices2;
    let answer;
    quizChoices2.forEach(function(answer) {
      if (answer === selectedAnswer) {
        answer.selected = !answer.selected;
        console.log(selectedAnswer);
        if (selectedAnswer.label === 'Strongly Agree') {
          answer = 1;
          console.log('I"m in option strongly agree');
          console.log('answer: ' + answer);
        } else if (selectedAnswer.label === 'Agree') {
          answer = 2;
          console.log('I"m in option agree');
          console.log('answer: ' + answer);
        } else if (selectedAnswer.label === 'Disagree') {
          answer = 3;
          console.log('I"m in option disagree');
          console.log('answer: ' + answer);
        } else {
          answer = 4;
          console.log('I"m in option strongly disagree');
          console.log('answer: ' + answer);
        }
      } else {
        answer.selected = false;
      }
    });
    let answers = {...this.state.answers}; // create the copy of state array
    answers[2] = answer; //new value
    this.setState({
      quizChoices2: quizChoices2,
      answers: {answers},
    });
  };
  onPressQuest3RadioButton = selectedAnswer => {
    let quizChoices3 = this.state.quizChoices3;
    let answer;
    quizChoices3.forEach(function(answer) {
      if (answer === selectedAnswer) {
        answer.selected = !answer.selected;
        console.log(selectedAnswer);
        if (selectedAnswer.label === 'Strongly Agree') {
          answer = 1;
          console.log('I"m in option strongly agree');
          console.log('answer: ' + answer);
        } else if (selectedAnswer.label === 'Agree') {
          answer = 2;
          console.log('I"m in option agree');
          console.log('answer: ' + answer);
        } else if (selectedAnswer.label === 'Disagree') {
          answer = 3;
          console.log('I"m in option disagree');
          console.log('answer: ' + answer);
        } else {
          answer = 4;
          console.log('I"m in option strongly disagree');
          console.log('answer: ' + answer);
        }
      } else {
        answer.selected = false;
      }
    });
    let answers = {...this.state.answers}; // create the copy of state array
    answers[3] = answer; //new value
    this.setState({
      quizChoices3: quizChoices3,
      answers: {answers},
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 30}}> Economy </Text>
        <ScrollView>
          <View style={styles.questionBox}>
            <Text style={styles.questionFont}>
              If economic globalisation is inevitable, it should primarily serve
              humanity rather than the interests of trans-national corporations.
            </Text>
            {this.state.quizChoices1.map(answer => (
              <RadioButton
                key={answer.label}
                selected={answer.selected}
                onPress={() => this.onPressQuest1RadioButton(answer)}
                label={answer.label}
                colors={'#f1c40f'}
                textStyle={{color: '#f1c40f'}}
              />
            ))}
          </View>
          <View style={styles.questionBox}>
            <Text style={styles.questionFont}>
              I’d always support my country, whether it was right or wrong.
            </Text>
            {this.state.quizChoices2.map(answer => (
              <RadioButton
                key={answer.label}
                selected={answer.selected}
                onPress={() => this.onPressQuest2RadioButton(answer)}
                label={answer.label}
                colors={'#f1c40f'}
                textStyle={{color: '#f1c40f'}}
              />
            ))}
          </View>
          <View style={styles.questionBox}>
            <Text style={styles.questionFont}>
              Military action that defies international law is sometimes
              justified.
            </Text>
            {this.state.quizChoices3.map(answer => (
              <RadioButton
                key={answer.label}
                selected={answer.selected}
                onPress={() => this.onPressQuest3RadioButton(answer)}
                label={answer.label}
                colors={'#f1c40f'}
                textStyle={{color: '#f1c40f'}}
              />
            ))}
          </View>
          <View style={styles.optionButton}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PoliticalCompassSocial', {
                  answers1: this.state.answers1,
                })
              }>
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
