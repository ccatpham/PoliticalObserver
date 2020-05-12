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
          value: 'Income',
          key: 'income',
        },
        {
          value: 'Personality Type',
          key: 'personalityType',
        },
        {
          value: 'Party Affiliation',
          key: 'partyAffiliation',
        },
      ],
      left: '',
      right: '',
    };
  }

  componentDidMount() {}

  compareDemographics() {
    if (this.state.left !== '' && this.state.right !== '') {
      pol.api
        .getDemographicsComparison(this.state.left, this.state.right)
        .then(data => {
          this.setState({
            data: data,
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
  }

  onChangeLeft(value, index, data) {
    this.setState({left: data[index].key});
    this.compareDemographics();
  }

  onChangeRight(value, index, data) {
    this.setState({right: data[index].key});
    this.compareDemographics();
  }

  renderItem(item) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeaderText}>{item.category}</Text>
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
    var leftChoices = this.state.choices;
    var rightChoices = this.state.choices;
    if (this.state.right !== '') {
      leftChoices = leftChoices.filter(
        choice => choice.key !== this.state.right,
      );
    }
    if (this.state.left !== '') {
      rightChoices = rightChoices.filter(
        choice => choice.key !== this.state.left,
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.compareDataContainer}>
              <Text style={styles.titleText}>Compare Demographic Data</Text>
              <View style={styles.comparisonContainer}>
                <Dropdown
                  containerStyle={styles.dropDownContainerStyle}
                  label="Left Side"
                  data={leftChoices}
                  onChangeText={(value, index, data) =>
                    this.onChangeLeft(value, index, data)
                  }
                  itemCount={9}
                />
                <Text style={styles.byText}>By</Text>
                <Dropdown
                  containerStyle={styles.dropDownContainerStyle}
                  label="Right Side"
                  data={rightChoices}
                  onChangeText={(value, index, data) =>
                    this.onChangeRight(value, index, data)
                  }
                  itemCount={9}
                />
              </View>
            </View>
            <View style={styles.dataContainer}>
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
  },
  compareDataContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
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
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  comparisonContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropDownContainerStyle: {
    flex: 1,
  },
  byText: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 18,
    marginHorizontal: 10,
  },
  dataContainer: {
    marginBottom: 10,
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
});
