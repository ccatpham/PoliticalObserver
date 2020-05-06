import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {VictoryAxis, VictoryPie} from 'victory-native';
export default class DemographicInsights extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.shadowContainerColumn}>
            <Text
              style={{alignSelf: 'center', fontWeight: 'bold', marginTop: 10}}>
              Age
            </Text>
            <View style={{marginHorizontal: 15, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <VictoryPie
                  width={200}
                  height={200}
                  colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
                  data={[
                    {x: 1, y: 2, label: 'one'},
                    {x: 2, y: 3, label: 'two'},
                    {x: 3, y: 5, label: 'three'},
                  ]}
                />
              </View>
              <View style={{flex: 1, marginTop: 40, marginLeft: 60}}>
                <Text> You are within 30% of users in this age group.</Text>
              </View>
            </View>
          </View>
          <View style={styles.shadowContainerColumn}>
            <Text
              style={{alignSelf: 'center', fontWeight: 'bold', marginTop: 10}}>
              Political Party
            </Text>
            <View style={{marginHorizontal: 15, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <VictoryPie
                  width={200}
                  height={200}
                  colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
                  data={[
                    {x: 1, y: 2, label: 'one'},
                    {x: 2, y: 3, label: 'two'},
                    {x: 3, y: 5, label: 'three'},
                  ]}
                />
              </View>
              <View style={{flex: 1, marginTop: 40, marginLeft: 60}}>
                <Text> You are within 20% of users in this political party.</Text>
              </View>
            </View>
          </View>
          <View style={styles.shadowContainerColumn}>
            <Text
              style={{alignSelf: 'center', fontWeight: 'bold', marginTop: 10}}>
              Education
            </Text>
            <View style={{marginHorizontal: 15, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <VictoryPie
                  width={200}
                  height={200}
                  colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
                  data={[
                    {x: 1, y: 2, label: 'one'},
                    {x: 2, y: 3, label: 'two'},
                    {x: 3, y: 5, label: 'three'},
                  ]}
                />
              </View>
              <View style={{flex: 1, marginTop: 40, marginLeft: 60}}>
                <Text> You are within 10% of users in this education group.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  shadowContainerColumn: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
});
