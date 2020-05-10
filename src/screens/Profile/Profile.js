import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
} from 'victory-native';
import pol from '../../api/apiConfig';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.user.id,
      demographicId: this.props.route.params.user.demographicId,
      partyAffiliation: '',
      martialStatus: '',
      age: '',
      education: '',
      ethnicity: '',
      incomeLevel: '',
      occupation: '',
      politicalAffiliation: '',
      state: '',
      personalityType: '',
      personalityScore: '',
      hasTakenPoliticalTest: false,
      hasTakenPersonalityTest: false,
      socialScore: 0,
      econScore: 0,
    };
  }

  componentDidMount = () => {
    this.getDemographic();
    this.props.navigation.addListener('focus', () => {
      if (this.props.route.params.hasTakenPoliticalTest) {
        this.setState({
          hasTakenPoliticalTest: this.props.route.params.hasTakenPoliticalTest,
          socialScore: this.props.route.params.socialScore,
          econScore: this.props.route.params.econScore,
        });
      }
      if (this.props.route.params.hasTakenPersonalityTest) {
        this.setState({
          hasTakenPersonalityTest: this.props.route.params
            .hasTakenPersonalityTest,
          personalityScore: this.props.route.params.personalityScore,
        });
        this.renderPersonalityType(this.state.personalityScore);
      }
    });
  };

  onPressEditDemographics = () => {
    this.props.navigation.navigate('Edit Demographics', {
      userId: this.props.route.params.user.id,
      demographicId: this.props.route.params.user.demographicId,
    });
  };

  onPressViewDemographicsInsights = () => {
    this.props.navigation.navigate('Demographic Insights', {
      userId: this.props.route.params.user.id,
    });
  };

  onPressViewIssues = () => {
    this.props.navigation.navigate('Voted On Issues', {
      userId: this.props.route.params.user.id,
    });
  };

  getDemographic = () => {
    pol.api
      .getDemographicById(this.props.route.params.user.demographicId)
      .then(response => {
        console.log(response);
        this.setState({
          partyAffiliation: response.partyAffiliation,
          martialStatus: response.maritalStatus,
          ageRange: response.ageRange,
          education: response.education,
          ethnicity: response.ethnicity,
          incomeLevel: response.incomeLevel,
          occupation: response.occupation,
          personalityType: response.personalityType,
          politicalAffiliation: response.politicalAffiliation,
          state: response.state,
          gender: response.gender,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  };

  renderPersonalityType = () => {
    if ((this.state.personalityScore = 'ISTJ')) {
      this.setState({
        personalityUri: require('../../../res/images/ISTJ.jpg'),
      });
    } else if ((this.state.personalityScore = 'ENTJ')) {
      this.setState({
        personalityUri: require('../../../res/images/ENTJ.jpg'),
      });
    } else if ((this.state.personalityScore = 'ENTP')) {
      this.setState({
        personalityUri: require('../../../res/images/ENTP.jpg'),
      });
    } else if ((this.state.personalityScore = 'ESFJ')) {
      this.setState({
        personalityUri: require('../../../res/images/ESFJ.jpg'),
      });
    } else if ((this.state.personalityScore = 'ESFP')) {
      this.setState({
        personalityUri: require('../../../res/images/ESFP.jpg'),
      });
    } else if ((this.state.personalityScore = 'ESTJ')) {
      this.setState({
        personalityUri: require('../../../res/images/ESTJ.jpg'),
      });
    } else if ((this.state.personalityScore = 'ESTP')) {
      this.setState({
        personalityUri: require('../../../res/images/ESTP.jpg'),
      });
    } else if ((this.state.personalityScore = 'INFJ')) {
      this.setState({
        personalityUri: require('../../../res/images/INFJ.jpg'),
      });
    } else if ((this.state.personalityScore = 'INFP')) {
      this.setState({
        personalityUri: require('../../../res/images/INFP.jpg'),
      });
    } else if ((this.state.personalityScore = 'INTJ')) {
      this.setState({
        personalityUri: require('../../../res/images/INTJ.jpg'),
      });
    } else if ((this.state.personalityScore = 'INTP')) {
      this.setState({
        personalityUri: require('../../../res/images/INTP.jpg'),
      });
    } else if ((this.state.personalityScore = 'ISFJ')) {
      this.setState({
        personalityUri: require('../../../res/images/ISFJ.jpg'),
      });
    } else if ((this.state.personalityScore = 'ISFP')) {
      this.setState({
        personalityUri: require('../../../res/images/ISFP.jpg'),
      });
    } else if ((this.state.personalityScore = 'ISTJ')) {
      this.setState({
        personalityUri: require('../../../res/images/ISTJ.jpg'),
      });
    } else {
      this.setState({
        personalityUri: require('../../../res/images/trump.jpg'),
      });
    }
  };

  renderPoliticalCompassPreResults = () => {
    return (
      <View>
        <Image
          style={{
            width: 250,
            height: 250,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          source={require('../../../res/images/political_spectrum.jpg')}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('PoliticalCompassLanding', {
              userId: this.props.route.params.user.id,
            })
          }>
          <Text style={styles.quizButton}>Go to Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderPoliticalCompassPostResults = () => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <VictoryChart width={200} height={200}>
              <VictoryAxis
                crossAxis
                width={100}
                height={100}
                domain={[-10, 10]}
                theme={VictoryTheme.material}
                offsetY={100}
                standalone={false}
              />
              <VictoryAxis
                dependentAxis
                crossAxis
                width={100}
                height={100}
                domain={[-10, 10]}
                theme={VictoryTheme.material}
                offsetX={100}
                standalone={false}
              />
              <VictoryScatter
                style={{data: {fill: '#c43a31'}}}
                size={7}
                data={[
                  {
                    x: this.state.socialScore,
                    y: this.state.econScore,
                  },
                ]}
              />
            </VictoryChart>
          </View>
          <View style={{flex: 1, marginTop: 50}}>
            <Text> You scored: </Text>
            <Text> Economic: {this.state.socialScore}</Text>
            <Text> Social : {this.state.econScore}</Text>
            <Text> You are authoritarian right.</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PoliticalCompassLanding', {
                userId: this.props.route.params.user.id,
              })
            }>
            <Text style={styles.politicalQuizButton}>Retake Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Political Compass Results', {
                userId: this.props.route.params.user.id,
                socialScore: this.state.socialScore,
                econScore: this.state.econScore,
              })
            }>
            <Text style={styles.politicalQuizButton}>View Insights</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderPersonalityPreResults = () => {
    return (
      <View>
        <Image
          style={styles.personalityImage}
          source={require('../../../res/images/16person.png')}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Personality Landing', {
              userId: this.props.route.params.user.id,
            })
          }>
          <Text style={styles.quizButton}>Go to Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderPersonalityPostResults = () => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Image
              style={styles.selfPersonalityImage}
              source={this.state.personalityUri}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Personality Landing', {
                userId: this.props.route.params.user.id,
              })
            }>
            <Text style={styles.politicalQuizButton}>Retake Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Personality Results', {
                userId: this.props.route.params.user.id,
                personalityScore: this.state.personalityScore,
              })
            }>
            <Text style={styles.politicalQuizButton}>View Insights</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <ScrollView>
        <View>
          <View style={styles.shadowContainerColumn}>
            <Text style={styles.headingTextStyle}>Political Compass</Text>
            <View>
              {this.state.hasTakenPoliticalTest
                ? this.renderPoliticalCompassPostResults()
                : this.renderPoliticalCompassPreResults()}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.shadowContainerColumn}>
            <Text style={styles.headingTextStyle}>Personality Quiz</Text>
            <View>
              {this.state.hasTakenPersonalityTest
                ? this.renderPersonalityPostResults()
                : this.renderPersonalityPreResults()}
            </View>
          </View>
        </View>
        <View style={styles.shadowContainerColumn}>
          <Text style={styles.headingTextStyle}>Demographic</Text>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.demographicDetail}>
              <Text style={{fontWeight: 'bold'}}>Political Affiliation:</Text>
              <Text>{this.state.politicalAffiliation}</Text>
            </View>
            <View style={styles.demographicDetail}>
              <Text style={{fontWeight: 'bold'}}>Party Affiliation:</Text>
              <Text> {this.state.partyAffiliation}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.demographicDetail}>
              <Text style={{fontWeight: 'bold'}}>Personality Type</Text>
              <Text>{this.state.personalityType}</Text>
            </View>
            <View style={styles.demographicDetail}>
              <Text style={{fontWeight: 'bold'}}>Yearly Income:</Text>
              <Text> {this.state.incomeLevel}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.demographicDetail}>
              <Text style={{fontWeight: 'bold'}}>Age:</Text>
              <Text> {this.state.ageRange}</Text>
            </View>
            <View style={styles.demographicDetail}>
              <Text style={{fontWeight: 'bold'}}>Education:</Text>
              <Text> {this.state.education}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.demographicDetail}>
              <Text style={{fontWeight: 'bold'}}>Martial Status:</Text>
              <Text> {this.state.martialStatus}</Text>
            </View>
            <View style={styles.demographicDetail}>
              <Text style={{fontWeight: 'bold'}}>Ethnicity:</Text>
              <Text>{this.state.ethnicity}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.demographicDetail}>
              <Text style={{fontWeight: 'bold'}}>Gender:</Text>
              <Text> {this.state.gender}</Text>
            </View>
            <View style={styles.demographicDetail}>
              <Text style={{fontWeight: 'bold'}}>Occupation:</Text>
              <Text> {this.state.occupation}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.onPressEditDemographics()}>
              <Text style={styles.quizButton}>Edit Demographics</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPressViewDemographicsInsights()}>
              <Text style={styles.politicalQuizButton}>View Insights</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.shadowContainerColumn}>
          <Text style={styles.headingTextStyle}>Past Activity</Text>
          <TouchableOpacity onPress={() => this.onPressViewIssues()}>
            <Text style={styles.quizButton}>View Voting History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  personalityImage: {
    width: 320,
    height: 250,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  selfPersonalityImage: {
    width: 250,
    height: 400,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headingTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  demographicDetail: {
    flex: 1,
    marginHorizontal: 20,
  },
  shadowContainerColumn: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
  shadowContainerColumnElectionPack: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
  quizButton: {
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  politicalQuizButton: {
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  editDemographicButton: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
