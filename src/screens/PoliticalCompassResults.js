import React from 'react';
import {Text, View} from 'react-native';

export default class PoliticalCompassResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers1: props.navigation.state.params.answers1,
      answers2: props.navigation.state.params.answers2,
      econScore: '',
      socialScore: '',
    };
  }

  calculateSocialScore(answers1) {
    let url = 'http://10.0.2.2:3000/social_quiz/';
    // post method
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        // pass in userID
        answers1: answers1,
      }),
    }).then(res => {
      return res.text();
    });
    // return score from endpoint
    // let score;
    // this.setState({socialScore: score});
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Political Compass Results</Text>
      </View>
    );
  }
}
