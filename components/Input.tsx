import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
//
import { capitalize } from '../utils';
import TextStyledRegular from './TextStyledRegular';
import Colors from '../constants/Colors';
import { inputKeys } from './ProductForm';

interface InputProps {
  inputName: inputKeys;
  type: 'contained' | 'fullWidth';
  errMessage: string;
}

const Input: React.FC<InputProps & TextInputProps> = props => {
  if (props.type === 'fullWidth') {
    return (
      <View>
        <TextInput
          {...props}
          style={[styles.input, styles.inputUrl, props.style]}
          placeholder="Enter URL here"
        />
        <TextStyledRegular style={styles.errMsg}>
          {props.errMessage}
        </TextStyledRegular>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.row}>
        <TextStyledRegular style={styles.text}>
          {capitalize(props.inputName)}
        </TextStyledRegular>
        <TextInput
          {...props}
          keyboardType={props.inputName === 'price' ? 'decimal-pad' : 'default'}
          style={[styles.input, styles.rowInput, props.style]}
        />
      </View>
      <TextStyledRegular style={styles.errMsg}>
        {props.errMessage}
      </TextStyledRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    marginRight: 20,
  },
  input: {
    fontSize: 20,
    fontFamily: 'MulishRegular',
    borderWidth: 1,
    borderColor: Colors.black,
  },
  rowInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    maxWidth: 240,
  },
  inputUrl: {
    marginTop: 30,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  errMsg: {
    fontSize: 16,
    marginTop: 5,
    color: 'red',
    marginHorizontal: 20,
  },
});

export default Input;
