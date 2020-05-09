import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import pol from '../api/apiConfig';
import {colors} from '../styles';

export default class EditDemographic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      occupation: '',
      demographicId: this.props.route.params.demographicId,
    };
  }

  updateOccupation = (demographicId, occupation) => {
    const userObject = {
      occupation: occupation,
    };
    pol.api
      .modifyDemographic(demographicId, userObject)
      .then(response => {
        this.setState({occupation: response.occupation});
        this.props.navigation.navigate('Edit Demographics', {
          occupation: this.state.occupation,
        });
        console.log(response.occupation);
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  onChangeOccupation(occupation) {
    this.setState({
      occupation: occupation,
    });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.dividers}>
            <Text style={styles.headingTextStyle}>Occupation</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Occupation'}
              placeholderTextColor={colors.gray}
              onChangeText={occupation => this.onChangeOccupation(occupation)}
              value={this.state.occupation}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.submitButton}>
              <Text
                style={styles.submitButtonText}
                onPress={() => {
                  this.updateOccupation(
                    this.state.demographicId,
                    this.state.occupation,
                  );
                }}>
                {' '}
                Submit Changes{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  fieldTextStyle: {
    fontSize: 20,
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
  dividers: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
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
