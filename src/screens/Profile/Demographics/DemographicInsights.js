import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import {VictoryAxis, VictoryPie} from 'victory-native';
import pol from '../../../api/apiConfig';
import {colors} from '../../../styles';
export default class DemographicInsights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      demographicId: this.props.route.params.user.demographicId,
      data: [],
    };
  }

  componentDidMount() {
    pol.api
      .getUserInsights(this.state.userId)
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
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeaderText}>{item.type}</Text>
        <View style={styles.itemChartContainer}>
          <VictoryPie
            data={item.data}
            labelRadius={10}
            width={300}
            height={300}
            padding={0}
            style={{
              labels: {
                fontSize: 16,
                fontWeight: 'bold',
              },
            }}
          />
        </View>
        <Text>
          Index: {item.index}, Percentage: {item.percentage}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
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
    margin: 20,
    backgroundColor: colors.polGray,
  },
  comparisonContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.polGray,
  },
  itemContainer: {},
  itemHeaderText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemChartContainer: {
    alignItems: 'center',
  },
});
