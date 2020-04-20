import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {colors} from '../styles';

const propTypes = {
  selected: PropTypes.bool.isRequired,
};

const defaultProps = {
  selected: false,
};

export default class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
  }

  onPressRadioButton = () => {
    this.setState({
      selected: !this.state.selected,
    });
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.RadioButton}
        onPress={this.onPressRadioButton}>
        <View
          style={[
            styles.RadioButtonSelection,
            this.state.selected
              ? styles.RadioButtonSelected
              : styles.RadioButtonUnselected,
          ]}
        />
      </TouchableOpacity>
    );
  }
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

const styles = StyleSheet.create({
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
});
