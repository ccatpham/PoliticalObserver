import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../styles';

const propTypes = {
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  color: PropTypes.string,
  textStyle: PropTypes.object,
};

const defaultProps = {
  label: '',
  color: colors.black,
  textStyle: null,
};

export default class RadioButton extends React.Component {
  render() {
    return (
      <View style={styles.RadioButtonViewContainer}>
        <TouchableOpacity
          style={styles.RadioButtonContainer}
          onPress={this.props.onPress}>
          <View style={[styles.RadioButton, {borderColor: this.props.color}]}>
            <View
              style={[
                styles.RadioButtonSelection,
                this.props.selected
                  ? styles.RadioButtonSelected && {
                      backgroundColor: this.props.color,
                    }
                  : styles.RadioButtonUnselected,
              ]}
            />
          </View>
          <Text style={[styles.RadioButtonText, this.props.textStyle]}>
            {this.props.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

const styles = StyleSheet.create({
  RadioButtonViewContainer: {
    alignItems: 'flex-start',
  },
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
    borderColor: colors.black,
    backgroundColor: colors.clear,
  },
  RadioButtonSelection: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  RadioButtonSelected: {
    backgroundColor: colors.black,
  },
  RadioButtonUnselected: {
    backgroundColor: colors.clear,
  },
  RadioButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
