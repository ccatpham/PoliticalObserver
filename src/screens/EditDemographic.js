import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default class EditDemographic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      occupation: '',
    };
  }
  render() {
    return (
      <View>
        <Text style={styles.headingTextStyle}>Occupation</Text>
        <TextInput
          style={{
            height: 40,
            fontSize: 20,
          }}
          placeholder={'Software Engineer'}
          onChangeText={text => this.setState({text})}
          placeholderTextColor={'#1e272e'}
        />
        <Text style={styles.headingTextStyle}>Political Affiliation</Text>
        <Picker>
          <Picker.Item label="Select a political affiliation" value="0" />
          <Picker.Item label="Democrat" value="Democrat" />
          <Picker.Item label="Republican" value="Republican" />
          <Picker.Item label="Libertarian" value="Libertarian" />
          <Picker.Item label="Green" value="Green" />
          <Picker.Item label="Constitution" value="Constitution" />
          <Picker.Item label="Unaligned" value="Unaligned" />
        </Picker>
        <Text style={styles.headingTextStyle}>Marital Status</Text>
        <Picker>
          <Picker.Item label="Select a marital status" value="0" />
          <Picker.Item label="Single" value="Single" />
          <Picker.Item label="Married" value="Married" />
        </Picker>
        <Text style={styles.headingTextStyle}>Education</Text>
        <Picker>
          <Picker.Item label="Select your education" value="0" />
          <Picker.Item label="None" value="None" />
          <Picker.Item label="General Education Development" value="GED" />
          <Picker.Item
            label="High School Diploma"
            value="High School Diploma"
          />
          <Picker.Item label="Associate's Degree" value="Associate's Degree" />
          <Picker.Item label="Bachelor's Degree" value="Bachelor's Degree" />
          <Picker.Item label="Master's Degree" value="Master's Degree" />
          <Picker.Item label="Doctoral Degree" value="Doctoral Degree" />
        </Picker>
        <View>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}> Submit Changes </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 5,
  },
  shadowContainerColumn: {
    paddingVertical: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
  submitButton: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 70,
    marginRight: 70,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
