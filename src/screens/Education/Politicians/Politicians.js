import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {colors} from '../../../styles';
import pol from '../../../api/apiConfig';

export default class Politicians extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      search: '',
      data: [],
    };
  }

  componentDidMount() {
    pol.api
      .getAllPoliticians()
      .then(politicians => {
        this.setState({
          data: politicians,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  updateSearch = search => {
    this.setState({search});
    if (search === '') {
      pol.api
        .getAllPoliticians()
        .then(politicians => {
          this.setState({
            data: politicians,
          });
        })
        .catch(error => {
          Alert.alert(
            'Error',
            error.code + ' ' + error.message,
            [{text: 'OK'}],
            {
              cancelable: false,
            },
          );
        });
    } else {
      pol.api
        .getPoliticiansBySearch(search)
        .then(politicians => {
          this.setState({
            data: politicians,
          });
        })
        .catch(error => {
          Alert.alert(
            'Error',
            error.code + ' ' + error.message,
            [{text: 'OK'}],
            {
              cancelable: false,
            },
          );
        });
    }
  };

  renderItem = item => {
    let partyImage = require('../../../../res/icons/democratIcon.png');
    if (item.party === 'Democrat' || item.party === 'D') {
      partyImage = require('../../../../res/icons/democratIcon.png');
    } else if (item.party === 'Republican' || item.party === 'R') {
      partyImage = require('../../../../res/icons/republicanIcon.png');
    }

    return (
      <TouchableOpacity
        style={styles.itemButtonContainer}
        onPress={() => {
          this.props.navigation.navigate('Politician Details', {
            politicianId: item.id,
          });
        }}>
        <View style={styles.imageContainer}>
          <Image source={item.imageUrl ? item.imageUrl : require('../../../../res/images/politician.png')} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>{item.name}</Text>
          <Text style={styles.subTitleText} numberOfLines={1}>
            {item.position}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={partyImage} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <SearchBar
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            inputStyle={styles.searchInput}
            lightTheme={true}
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
          />
          <FlatList
            style={styles.listContainer}
            data={this.state.data}
            renderItem={({item}) => this.renderItem(item)}
          />
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
  searchContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
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
  searchInputContainer: {
    backgroundColor: colors.polLightGray,
  },
  searchInput: {
    color: colors.black,
  },
  listContainer: {
    paddingVertical: 10,
  },
  itemButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
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
  imageContainer: {
    height: 75,
    width: 75,
    borderRadius: 37.5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 37.5,
  },
  contentContainer: {
    flex: 1,
    height: 75,
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 18,
  },
  text: {
    fontSize: 16,
  },
});
