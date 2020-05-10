import React from 'react';
import {
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {VictoryPie} from 'victory-native';
import {colors} from '../../styles';
import pol from '../../api/apiConfig';

export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalVotes: 538,
      leftVotes: 192,
      rightVotes: 192,
    };
  }

  componentDidMount() {}

  renderItem(item) {
    let leftResultsLeft = 0;
    let rightResultsLeft = 0;
    if (item.winResult - item.leftResults >= 0) {
      leftResultsLeft = item.winResult - item.leftResults;
    }
    if (item.winResult - item.rightResults >= 0) {
      rightResultsLeft = item.winResult - item.rightResults;
    }
    return (
      <View style={styles.electionResultsContainer}>
        <Text style={styles.electionResultsHeaderText}>{item.header}</Text>
        <Text style={styles.electionResultsSubHeaderText}>
          {item.total - item.leftResults - item.rightResults}
          {item.subHeader}
        </Text>
        <View style={styles.candidatesContainer}>
          <View style={styles.leftCandidateContainer}>
            <Image
              style={styles.candidateImage}
              source={require('../../../res/images/biden.jpg')}
            />
            <View style={styles.candidateContainer}>
              <Text style={styles.leftCandidateNameText}>{item.leftTitle}</Text>
              <Text style={styles.leftResultsText}>{item.leftResults}</Text>
            </View>
          </View>
          <View style={styles.rightCandidateContainer}>
            <View style={styles.candidateContainer}>
              <Text style={styles.rightCandidateNameText}>
                {item.rightTitle}
              </Text>
              <Text style={styles.rightResultsText}>{item.rightResults}</Text>
            </View>
            <Image
              style={styles.candidateImage}
              source={require('../../../res/images/trump.jpg')}
            />
          </View>
        </View>
        <View style={styles.resultsBarContainer}>
          <View style={[styles.leftResultsBar, {flex: item.leftResults}]} />
          <View
            style={[
              styles.middleResultsBar,
              {
                flex: item.total - item.leftResults - item.rightResults,
                marginHorizontal: item.total === 0 && 1,
              },
            ]}
          />
          <View style={[styles.rightResultsBar, {flex: item.rightResults}]} />
        </View>
        <View style={styles.resultsBarTextContainer}>
          <View style={styles.leftResultsBarTextContainer}>
            <Text style={styles.leftResultsBarText}>
              {leftResultsLeft} needed
            </Text>
          </View>
          <View style={styles.middleResultsBarTextContainer}>
            <Text style={styles.middleResultsBarText}>
              {item.winResult}
              {item.winText}
            </Text>
          </View>
          <View style={styles.rightResultsBarTextContainer}>
            <Text style={styles.rightResultsBarText}>
              {rightResultsLeft} needed
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderDashboardModule() {
    //let total = this.state.total - this.state.leftVotes - this.state.rightVotes;
    // let total = 538;
    // let leftResults = 192;
    // let rightResults = 192;
    // total = total - leftResults - rightResults;
    // let leftResultsLeft = 0;
    // let rightResultsLeft = 0;
    // if (270 - leftResults >= 0) {
    //   leftResultsLeft = 270 - leftResults;
    // }
    // if (270 - rightResults >= 0) {
    //   rightResultsLeft = 270 - rightResults;
    // }

    let data = [
      {
        total: 538,
        winResult: 270,
        leftResults: 192,
        rightResults: 192,
        header: 'President',
        subHeader: ' electoral votes still available',
        leftTitle: 'Biden',
        rightTitle: 'Trump',
        winText: ' to win',
      },
      {
        total: 34,
        winResult: 17,
        leftResults: 9,
        rightResults: 9,
        header: 'US Senate',
        subHeader: ' of 100 seats up for election',
        leftTitle: 'Democrats',
        rightTitle: 'Republicans',
        winText: ' to win majority',
      },
      {
        total: 435,
        winResult: 218,
        leftResults: 189,
        rightResults: 189,
        header: 'US House',
        subHeader: ' seats up for election',
        leftTitle: 'Democrats',
        rightTitle: 'Republicans',
        winText: ' to win majority',
      },
    ];

    return (
      <View style={styles.dashboardModuleContainer}>
        <FlatList data={data} renderItem={({item}) => this.renderItem(item)} />
      </View>
    );
  }

  renderNotifications() {
    return (
      <TouchableOpacity
        style={styles.notificationsContainer}
        onPress={() => this.props.navigation.navigate('Notification')}>
        <View style={styles.notificationsHeaderContainer}>
          <Text style={styles.notificationsHeaderText}>
            Election Incoming! Register to vote!
          </Text>
        </View>
        <Text style={styles.notificationsViewText}>View Notification ></Text>
      </TouchableOpacity>
    );
  }

  renderData() {
    return (
      <TouchableOpacity
        style={styles.dataContainer}
        onPress={() => this.props.navigation.navigate('Compare Data')}>
        <View>
          <Text>Compare Data</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {this.renderDashboardModule()}
          {this.renderNotifications()}
          {this.renderData()}
        </View>
      </View>
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
    margin: 20,
  },
  dashboardModuleContainer: {
    flex: 3,
  },
  electionResultsHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  electionResultsSubHeaderText: {
    fontSize: 14,
    color: colors.polDarkGray,
  },
  electionResultsContainer: {
    flex: 1,
  },
  candidatesContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  leftCandidateContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rightCandidateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  candidateImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  candidateContainer: {
    marginHorizontal: 8,
  },
  leftCandidateNameText: {
    fontSize: 14,
    textAlign: 'left',
  },
  rightCandidateNameText: {
    fontSize: 14,
    textAlign: 'right',
  },
  leftResultsText: {
    textAlign: 'left',
    fontSize: 20,
    color: colors.polBlue,
  },
  rightResultsText: {
    textAlign: 'right',
    fontSize: 20,
    color: colors.polRed,
  },
  resultsBarContainer: {
    flexDirection: 'row',
    height: 16,
  },
  leftResultsBar: {
    flex: 1,
    backgroundColor: colors.polBlue,
  },
  middleResultsBar: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: colors.gray,
  },
  rightResultsBar: {
    flex: 1,
    backgroundColor: colors.polRed,
  },
  resultsBarTextContainer: {
    flexDirection: 'row',
  },
  leftResultsBarTextContainer: {
    flex: 1,
  },
  middleResultsBarTextContainer: {
    flex: 1,
  },
  rightResultsBarTextContainer: {
    flex: 1,
  },
  leftResultsBarText: {
    color: colors.polDarkGray,
  },
  middleResultsBarText: {
    textAlign: 'center',
    color: colors.polDarkGray,
  },
  rightResultsBarText: {
    textAlign: 'right',
    color: colors.polDarkGray,
  },
  notificationsContainer: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: colors.polGray,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: colors.polGray,
  },
});
