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
} from 'react-native';
import {colors} from '../../../styles';
import pol from '../../../api/apiConfig';

export default class Politicians extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      data: [],
    };
  }

  componentDidMount() {
    pol.api
      .getAllPoliticians()
      .then(politicians => {
        this.setState({
          userId: this.state.userId,
          data: politicians,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  renderItem = item => {
    let partyImage = require('../../../../res/icons/democratIcon.png');
    if (item.party === 'Democrat') {
      partyImage = require('../../../../res/icons/democratIcon.png');
    } else if (item.party === 'Republican') {
      partyImage = require('../../../../res/icons/republicanIcon.png');
    }

    let image = '';
    if (item.name === 'Bernie Sanders') {
      image = require('../../../../res/images/sanders.png');
    } else if (item.name === 'Donald Trump') {
      image = require('../../../../res/images/trump.jpg');
    } else if (item.name === 'Mike Pence') {
      image = require('../../../../res/images/pence.jpg');
    } else if (item.name === 'Joe Biden') {
      image = require('../../../../res/images/biden.jpg');
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
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>{item.name}</Text>
          <Text style={styles.subTitleText}>{item.position}</Text>
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
        <FlatList
          style={styles.listContainer}
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
          extraData={true}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.polWhite,
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
