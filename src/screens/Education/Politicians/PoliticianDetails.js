import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../styles';
import pol from '../../../api/apiConfig';

export default class IssueDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.politicianId,
      name: '',
      position: '',
      party: '',
      state: '',
      dateOfBirth: null,
      bio: '',
    };
  }

  componentDidMount() {
    pol.api
      .getPoliticianById(this.state.id)
      .then(politician => {
        this.setState({...politician});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  render() {
    let partyColor = colors.black;
    if (this.state.party === 'Democrat') {
      partyColor = colors.polBlue;
    } else if (this.state.party === 'Republican') {
      partyColor = colors.polRed;
    }

    let image = require('../../../../res/images/politician.png');
    if (this.state.name === 'Bernie Sanders') {
      image = require('../../../../res/images/sanders.png');
    } else if (this.state.name === 'Donald Trump') {
      image = require('../../../../res/images/trump.jpg');
    } else if (this.state.name === 'Mike Pence') {
      image = require('../../../../res/images/pence.jpg');
    } else if (this.state.name === 'Joe Biden') {
      image = require('../../../../res/images/biden.jpg');
    }

    let dateOfBirth = '';
    if (this.state.dateOfBirth !== null) {
      dateOfBirth = this.state.dateOfBirth.toString();
    }
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View>
            <Image source={image} style={{height: 200, width: 200}} />
          </View>
          <Text>{this.state.name}</Text>
          <Text>{dateOfBirth}</Text>
          <Text>{this.state.position}</Text>
          <Text>{this.state.state}</Text>
          <Text>{this.state.party}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
});
