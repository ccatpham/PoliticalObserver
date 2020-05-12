import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
} from 'victory-native';
import pol from '../../../api/apiConfig';
export default class PoliticalCompassResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      econScore: this.props.route.params.econScore,
      socialScore: this.props.route.params.socialScore,
      politicalScore: this.props.route.params.politicalScore,
      userId: this.props.route.params.userId,
      hasTakenPoliticalTest: true,
      description: '',
    };
  }

  componentDidMount() {
    this.getIdeologyInformation();
  }

  getIdeologyInformation = () => {
    pol.api
      .getPoliticalIdeologyByName(this.state.politicalScore)
      .then(response => {
        this.setState({
          description: response.description,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              {' '}
              You are a {this.state.politicalScore}
            </Text>
            <Text style={{textAlign: 'center'}}> Social Score: </Text>
            <Text style={{textAlign: 'center'}}>{this.state.socialScore}</Text>
            <Text style={{textAlign: 'center'}}> Econ Score: </Text>
            <Text style={{textAlign: 'center'}}>{this.state.econScore}</Text>
          </View>
          <View style={styles.container}>
            <VictoryChart width={400} height={400}>
              <VictoryAxis
                crossAxis
                width={400}
                height={400}
                domain={[-6, 6]}
                theme={VictoryTheme.material}
                offsetY={200}
                standalone={false}
              />
              <VictoryAxis
                dependentAxis
                crossAxis
                width={400}
                height={400}
                domain={[-6, 6]}
                theme={VictoryTheme.material}
                offsetX={200}
                standalone={false}
              />
              <VictoryScatter
                style={{data: {fill: '#c43a31'}}}
                size={7}
                data={[
                  {
                    x: Number(this.state.econScore),
                    y: Number(this.state.socialScore),
                  },
                ]}
              />
            </VictoryChart>
            <View style={{marginHorizontal: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {this.state.politicalScore}
              </Text>
              <Text>{this.state.description}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.quizButton}
                onPress={() =>
                  this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'Profile',
                          params: {
                            socialScore: this.state.socialScore,
                            econScore: this.state.econScore,
                            politicalScore: this.state.politicalScore,
                            hasTakenPoliticalTest: this.state
                              .hasTakenPoliticalTest,
                          },
                        },
                      ],
                    }),
                  )
                }>
                <Text style={styles.quizButtonText}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  quizButton: {
    width: 150,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 70,
    marginRight: 70,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
  },
  quizButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
