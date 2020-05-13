import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import RadioButton from '../../Components/RadioButton';
import {colors} from '../../../styles';
export default class PoliticalCompassEconomic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          prompt: 'The freer the market, the freer the people.',
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
            'The only social responsibility of a company should be to deliver a profit to its shareholders.',
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
            'Those with the ability to pay should have access to higher standards of medical care.',
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
          prompt:
            'Because corporations cannot be trusted to voluntarily protect the environment, they require regulation.',
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
            '“from each according to his ability, to each according to his need” is a fundamentally good idea.',
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
            'It’s a sad reflection on our society that something as basic as drinking water is now a bottled, branded consumer product.',
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
      answers: [0, 0, 0, 0, 0, 0],
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
    let answers = this.state.answers; // create the copy of state array
    answers[questionNumber] = selection + 1; //new value
    this.setState({
      questions: questions,
      answers: answers,
    });
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View>
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
                      textStyle={{color: colors.black}}
                    />
                  ))}
                </View>
              ))}
              <TouchableOpacity
                style={styles.sectionButtonContainer}
                onPress={() => {
                  this.props.navigation.navigate('Political Compass Social', {
                    answers: this.state.answers,
                    userId: this.state.userId,
                  });
                }}>
                <Text style={styles.sectionButtonText}> Next </Text>
              </TouchableOpacity>
            </View>
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
