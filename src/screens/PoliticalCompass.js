import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView, ImageBackground,
} from 'react-native';
import * as Progress from 'react-native-progress';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
let radio_props = [{label: 'Agree', value: 0}, {label: 'Disagree', value: 1}];
export default class PoliticalCompass extends React.Component {
  render() {
    return (
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 30}}> Economy </Text>
        <ScrollView>
          <View style={styles.questionBox}>
            <Text style={styles.questionFont}>
              If economic globalisation is inevitable, it should primarily serve
              humanity rather than the interests of trans-national corporations.
            </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={value => {
                this.setState({value: value});
              }}
            />
          </View>
          <View style={styles.questionBox}>
            <Text style={styles.questionFont}>
              I’d always support my country, whether it was right or wrong.
            </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={value => {
                this.setState({value: value});
              }}
            />
          </View>
          <View style={styles.questionBox}>
            <Text style={styles.questionFont}>
              Military action that defies international law is sometimes
              justified.
            </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={value => {
                this.setState({value: value});
              }}
            />
          </View>
          <View style={styles.optionButton}>
            <TouchableOpacity>
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
