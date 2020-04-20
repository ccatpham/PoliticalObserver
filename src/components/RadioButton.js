import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../styles';

const propTypes = {
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
};

const defaultProps = {
  label: '',
};

export default class RadioButton extends React.Component {
  render() {
    return (
      <View style={styles.RadioButtonContainer}>
        <TouchableOpacity
          style={styles.RadioButton}
          onPress={this.props.onPress}>
          <View
            style={[
              styles.RadioButtonSelection,
              this.props.selected
                ? styles.RadioButtonSelected
                : styles.RadioButtonUnselected,
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.RadioButtonText}>{this.props.label}</Text>
      </View>
    );
  }
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

const styles = StyleSheet.create({
  RadioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RadioButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.paleGreen,
    backgroundColor: colors.white,
  },
  RadioButtonSelection: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  RadioButtonSelected: {
    backgroundColor: colors.paleGreen,
  },
  RadioButtonUnselected: {
    backgroundColor: colors.white,
  },
  RadioButtonText: {
      marginLeft: 10,
      fontSize: 16,
  },
});
