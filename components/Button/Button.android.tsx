import React, { Children } from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from 'react-native';
//
import Colors from '../../constants/Colors';
import TextStyledRegular from '../TextStyledRegular';

interface ButtonProps extends TouchableNativeFeedbackProps {
  title: string;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <TouchableNativeFeedback {...props}>
      <View style={[styles.wrapper, props.style]}>
        <TextStyledRegular style={styles.text}>{props.title}</TextStyledRegular>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 14,
    minWidth: 100,

    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 19,
    letterSpacing: 1,
  },
});

export default Button;
