import React from 'react';
import {
  Image,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {VictoryPie} from 'victory-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../styles';
import pol from '../../api/apiConfig';

const windowWidth = Dimensions.get('window').width;

export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalVotes: 538,
      leftVotes: 192,
      rightVotes: 192,
      notifications: [],
      activeNotificationSlide: 0,
    };

    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.compareDataButton}
          onPress={() => this.props.navigation.navigate('Compare Data')}>
          <Image
            style={styles.compareDataImage}
            source={require('../../../res/icons/pieChartIcon.png')}
          />
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount() {
    pol.api
      .getRecentNotifications()
      .then(notifications => {
        this.setState({
          notifications: notifications,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

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
            <View style={styles.candidateImageContainer}>
            { item.leftTitle === 'Biden' ? <Image
              style={styles.candidateImage}
              source={require('../../../res/images/biden.jpg')}
            /> : <Image
                style={styles.candidateImage}
                source={require('../../../res/icons/democratIcon.png')}
            />}
            </View>
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
            <View style={styles.candidateImageContainer}>
            { item.rightTitle === 'Trump' ? <Image
                style={styles.candidateImage}
                source={require('../../../res/images/trump.jpg')}
            /> : <Image
                style={styles.candidateImage}
                source={require('../../../res/icons/republicanIcon.png')}
            />}
            </View>
          </View>
        </View>
        <View style={styles.resultsBarContainer}>
          <View style={[styles.leftResultsBar, {flex: item.leftResults}]} />
          <View
            style={[
              styles.middleResultsBar,
              {
                flex: item.total - item.leftResults - item.rightResults,
                marginHorizontal: item.total === 0 ? 1 : 2,
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

  renderNotification({item, index}) {
    return (
      <TouchableOpacity
        style={styles.notificationContainer}
        onPress={() =>
          this.props.navigation.navigate('Notification', {
            notificationId: item.id,
          })
        }>
        <View style={styles.notificationsHeaderContainer}>
          <Text style={styles.notificationsHeaderText}>{item.title}</Text>
        </View>
        <View style={styles.notificationsViewContainer}>
          <Text style={styles.notificationsViewText}>View Notification</Text>
          <Image
            style={styles.arrowIcon}
            source={require('../../../res/icons/rightArrow.png')}
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderNotifications() {
    return (
      <View style={styles.notificationsContainer}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.notifications}
          renderItem={this.renderNotification.bind(this)}
          onSnapToItem={index =>
            this.setState({activeNotificationSlide: index})
          }
          sliderWidth={windowWidth}
          itemWidth={windowWidth - 120}
        />
        <Pagination
          dotsLength={this.state.notifications.length}
          activeDotIndex={this.state.activeNotificationSlide}
          containerStyle={styles.notificationsPaginationStyle}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.polGray,
          }}
          inactiveDotStyle={{}}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {this.renderDashboardModule()}
          {this.renderNotifications()}
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
  },
  compareDataButton: {
    marginHorizontal: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  compareDataImage: {
    height: 32,
    width: 32,
  },
  dashboardModuleContainer: {
    flex: 3,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 4,
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
    marginBottom: 8,
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
  candidateImageContainer: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  candidateImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    flex: 2,
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
  },
  notificationsPaginationStyle: {
    paddingVertical: 0,
    marginBottom: 8,
  },
  notificationContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 8,
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
  notificationsHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationsHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 2,
  },
  notificationsViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  notificationsViewText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  arrowIcon: {
    height: 12,
    width: 12,
    marginLeft: 2,
  },
});
