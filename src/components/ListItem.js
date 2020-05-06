import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, Image, View} from 'react-native';
import {colors} from '../styles';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  choice: PropTypes.string,
  icon: PropTypes.string,
};

const defaultProps = {
  label: '',
  color: colors.black,
  textStyle: null,
};

export default class ListItem extends React.Component {
  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#bdc3c7',
          }}>
          <View style={{backgroundColor: 'gray', flex: 1}}>
            <Image
              source={this.props.icon}
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          </View>
          <View style={{backgroundColor: 'red', flex: 5}}>
            <Text style={styles.headingTextStyle}>{this.props.title}</Text>
            <Text>{this.props.description}</Text>
          </View>
          <View style={{backgroundColor: 'blue', flex: 1}}>
            <Text
              style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              {this.props.choice}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

const styles = StyleSheet.create({
  headingTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  shadowContainerColumn: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 3,
    elevation: 1,
    position: 'relative',
    borderBottomWidth: 0,
  },
});
