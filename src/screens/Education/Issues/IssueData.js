import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {colors, colorsIssueData} from '../../../styles';
import pol from '../../../api/apiConfig';
import {VictoryPie} from 'victory-native';

export default class IssueData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      issueId: this.props.route.params.issueId,
      vote: this.props.route.params.vote,
      title: this.props.route.params.issueTitle,
      description: this.props.route.params.issueDescription,
      data: [],
      issueData: [],
    };
  }

  componentDidMount() {
    pol.api
      .getIssueById(this.state.userId, this.state.issueId)
      .then(issueResponse => {
        let issue = issueResponse.issue;
        let votedInfo = issueResponse.votedInfo;
        this.setState({...issue, ...votedInfo, voting: false});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
    pol.api
      .getIssueDataByIssueId(this.state.issueId)
      .then(response => {
        this.setState({issueData: response});
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  renderResultsView() {
    return (
      <View style={styles.resultsDetailsContainer}>
        <View style={styles.resultsChartContainer}>
          <VictoryPie
            data={this.state.data}
            colorScale={[colors.polRed, colors.polGreen]}
            labelRadius={20}
            width={150}
            height={150}
            padding={0}
            style={{
              parent: {
                shadowColor: colors.black,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              labels: {
                fill: colors.polWhite,
                fontSize: 16,
                fontWeight: 'bold',
              },
            }}
          />
        </View>
        <View style={styles.resultsInformationContainer}>
          <View style={styles.resultsDescriptionContainer}>
            <Text style={styles.resultsDescriptionText}>
              {this.state.title + ': \n'}
              {this.state.description}
            </Text>
          </View>
          <View style={styles.userVoteContainer}>
            <Text style={styles.userVoteText}>You Voted: </Text>
            <Text
              style={[
                styles.userVoteText,
                this.state.vote
                  ? {color: colors.polGreen}
                  : {color: colors.polRed},
              ]}>
              {this.state.vote}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderItem(item) {
    let key = item.key;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeaderText}>{item.type}</Text>
        <View style={styles.itemChartContainer}>
          <VictoryPie
            data={item.data}
            colorScale={colorsIssueData[item.key]}
            width={150}
            height={150}
            innerRadius={50}
            padAngle={2}
            labelRadius={20}
            labels={() => ''}
            padding={0}
            style={{
              parent: {
                shadowColor: colors.black,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              labels: {
                fontSize: 16,
                fontWeight: 'bold',
              },
            }}
          />
        </View>
        <View style={styles.itemKeyContainer}>
          <FlatList
            data={item.data}
            renderItem={({item, index}) => {
              return (
                <View style={styles.keyContainer}>
                  <View
                    style={[
                      styles.keyColor,
                      {backgroundColor: colorsIssueData[key][index]},
                    ]}
                  />
                  <Text style={styles.keyText}>{item.x}</Text>
                </View>
              );
            }}
            numColumns={4}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            {this.renderResultsView()}
            <FlatList
              data={this.state.issueData}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.polWhite,
  },
  contentContainer: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: colors.polWhite,
  },
  resultsDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
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
  resultsChartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  resultsInformationContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  resultsDescriptionContainer: {
    flex: 1,
  },
  resultsDescriptionText: {
    fontSize: 14,
  },
  userVoteContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  userVoteText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  chartTitle: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingTop: 10,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  itemContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
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
  itemHeaderText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemChartContainer: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemKeyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  keyColor: {
    marginRight: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  keyText: {
    textAlign: 'center',
  },
});
