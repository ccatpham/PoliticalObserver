//Add Search Bar Filter on Listview
import React from 'react';

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import PoliticianProfile from './PoliticianPage';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = {isLoading: true, text: ''};
  }

  SearchFilterFunction(text) {
    this.setState({
      //setting the filtered newData on data source
      //After setting the data it will automatically re-render the view
      text: text,
    });
  }

  handleSubmit = () => {
    // getPoliticianInfo(this.state.text).then(res => {
    //   if (res.message === 'Not Found') {
    //     this.setState({
    //       error: 'Politician not found',
    //     });
    //   } else {
    //     this.props.navigation.push({
    //       passProps: {politicianInfo: res},
    //       component: PoliticianPage,
    //     });
    //     this.props.navigation.navigate(PoliticianPage);
    //     this.setState({
    //       error: false,
    //       text: '',
    //     });
    //   }
    // });
    // alert('you clicked!');
    this.props.navigation.navigate('PoliticianProfile', {
      text: this.state.text,
    });
  }

  render() {
    return (
      //ListView to show with text input used as search bar
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Try searching 'Biden'..."
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    padding: 16,
  },
  textStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  button: {
    paddingBottom: 20,
  },
});

export default withNavigation(SearchBar);
