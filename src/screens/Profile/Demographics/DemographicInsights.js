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
import {VictoryPie} from 'victory-native';
import pol from '../../../api/apiConfig';
import {colors, colorsData} from '../../../styles';
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
    let key = item.key;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeaderText}>{item.type}</Text>
        <View style={styles.itemChartContainer}>
          <VictoryPie
            data={item.data}
            colorScale={colorsData[item.key]}
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
                      {backgroundColor: colorsData[key][index]},
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
            <FlatList
              data={this.state.data}
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
    justifyContent: 'center',
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
  comparisonContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.polGray,
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
