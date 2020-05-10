import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RadioButton from '../../components/RadioButton';
import {colors} from '../../styles';

export default class RegisterPersonalityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.route.params.user,
      personalityTypes: [
        {
          label: 'INTJ',
          selected: false,
        },
        {
          label: 'INTP',
          selected: false,
        },
        {
          label: 'ENTJ',
          selected: false,
        },
        {
          label: 'ENTP',
          selected: false,
        },
        {
          label: 'INFJ',
          selected: false,
        },
        {
          label: 'INFP',
          selected: false,
        },
        {
          label: 'ENFJ',
          selected: false,
        },
        {
          label: 'ENFP',
          selected: false,
        },
        {
          label: 'ISTJ',
          selected: false,
        },
        {
          label: 'ISFJ',
          selected: false,
        },
        {
          label: 'ESTJ',
          selected: false,
        },
        {
          label: 'ESFJ',
          selected: false,
        },
        {
          label: 'ISTP',
          selected: false,
        },
        {
          label: 'ISFP',
          selected: false,
        },
        {
          label: 'ESTP',
          selected: false,
        },
        {
          label: 'ESFP',
          selected: false,
        },
      ],
    };
  }

  onPressContinue = () => {
    let user = this.state.user;
    let personalityTypeChoice = this.state.personalityTypes.find(choice => {
      return choice.selected === true;
    });
    if (personalityTypeChoice != null) {
      user.personalityType = personalityTypeChoice.label;
    }

    this.props.navigation.navigate('Register Political', {
      user: user,
    });
  };

  onPressSkip = () => {
    this.props.navigation.navigate('Register Political', {
      user: this.state.user,
    });
  };

  onPressPersonalityTypeRadioButton = selectedPersonalityType => {
    let personalityTypeChoices = this.state.personalityTypes;
    personalityTypeChoices.forEach(function(personalityType) {
      if (personalityType === selectedPersonalityType) {
        personalityType.selected = !personalityType.selected;
      } else {
        personalityType.selected = false;
      }
    });
    this.setState({
      personalityTypes: personalityTypeChoices,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              What is your personality type?
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonHeaderText}>Personality Type</Text>
              <View style={styles.radioButtonColumn}>
                {this.state.personalityTypes.map(personalityType => (
                  <RadioButton
                    key={personalityType.label}
                    selected={personalityType.selected}
                    onPress={() =>
                      this.onPressPersonalityTypeRadioButton(personalityType)
                    }
                    label={personalityType.label}
                  />
                ))}
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.continueButtonContainer}
            onPress={this.onPressContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButtonContainer}
            onPress={this.onPressSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.polWhite,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  headerText: {
    margin: 10,
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    flex: 1,
    marginVertical: 5,
  },
  radioButtonHeaderText: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polBlue,
  },
  radioButtonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButtonColumn: {
    flex: 1,
  },
  continueButtonContainer: {
    alignSelf: 'center',
    width: 200,
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: colors.polBlue,
  },
  continueButtonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  skipButtonContainer: {
    alignSelf: 'center',
    width: 100,
  },
  skipButtonText: {
    textAlign: 'center',
    marginVertical: 10,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.polBlue,
  },
});
