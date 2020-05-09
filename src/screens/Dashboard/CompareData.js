import React from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../styles';
import pol from '../../api/apiConfig';
import {VictoryPie} from 'victory-native';
import {Dropdown} from 'react-native-material-dropdown';

export default class CompareDataScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      choices: [
        {
          value: 'Age',
          key: 'age',
        },
        {
          value: 'Gender',
          key: 'gender',
        },
        {
          value: 'State',
          key: 'state',
        },
        {
          value: 'Marital Status',
          key: 'maritalStatus',
        },
        {
          value: 'Ethnicity',
          key: 'ethnicity',
        },
        {
          value: 'Education',
          key: 'education',
        },
        {
          value: 'Personality Type',
          key: 'personalityType',
        },
      ],
      left: '',
      right: '',
    };
  }

  componentDidMount() {
    pol.api
      .getDemographicsComparison(this.state.left, this.state.right)
      .then(data => {
        this.setState({
          data: data,
        });
      })
      .catch(error => {
        Alert.alert('Error', error.code + ' ' + error.message, [{text: 'OK'}], {
          cancelable: false,
        });
      });
  }

  renderItem(item) {
    return (
      <View>
        <Text>{item.category}</Text>
        <VictoryPie
          data={item.data}
          labelRadius={10}
          width={150}
          height={150}
          padding={0}
          style={{
            labels: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View>
              <View>
                <Dropdown
                    label='Left Side'
                    data={this.state.choices}
                />
                <Text>by</Text>
                <Dropdown
                    label='Right Side'
                    data={this.state.choices}
                />
              </View>
              <View>
                <TouchableOpacity>
                  <Text>Compare</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <FlatList
                data={this.state.data}
                renderItem={({item}) => this.renderItem(item)}
              />
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
});
