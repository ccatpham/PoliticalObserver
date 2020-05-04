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
    let partyColor = colors.black;
    if (item.party === 'Democrat') {
      partyColor = colors.polBlue;
    } else if (item.party === 'Republican') {
      partyColor = colors.polRed;
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
          <Text style={[styles.text, {color: partyColor}]}>{item.party}</Text>
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
    marginHorizontal: 20,
  },
  itemButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: colors.polGray,
  },
  imageContainer: {},
  image: {
    height: 75,
    width: 75,
    borderRadius: 37.5,
  },
  contentContainer: {
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
