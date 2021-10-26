import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
//
import Button from './Button';
import useFormReducer from '../hooks/useFormReducer';
import Input from './Input';
import { ScrollView } from 'react-native-gesture-handler';

export interface inputNames {
  title: string;
  price: string;
  description: string;
  url: string;
}
export type inputKeys = keyof inputNames;

const basicInputs = ['title', 'price', 'description', 'url'] as const;

interface ProductFormProps extends inputNames {
  buttonTitle: string;
  submitFunc: (
    title: string,
    price: string,
    description: string,
    imageUrl: string
  ) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  title,
  price,
  description,
  url,
  buttonTitle,
  submitFunc,
}) => {
  const { state, dispatch } = useFormReducer({
    title,
    price,
    description,
    url,
  });

  const onChangeText = (value: string, inputName: inputKeys): void => {
    dispatch({
      type: 'update_input',
      payload: { title: inputName, value },
    });
  };

  const onFormSubmit = () => {
    if (!state.formValid) {
      return Alert.alert('Please fill out the form correctly');
    }

    submitFunc(
      state.inputValues.title,
      state.inputValues.price,
      state.inputValues.description,
      state.inputValues.url
    );
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="height"
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={30}
      >
        {basicInputs.map(inputName => (
          <Input
            inputName={inputName}
            value={state.inputValues[inputName]}
            onChangeText={value => onChangeText(value, inputName)}
            type={inputName === 'url' ? 'fullWidth' : 'contained'}
            key={inputName}
            errMessage={state.inputErrMessages[inputName]}
          />
        ))}

        <Button
          style={styles.button}
          title={buttonTitle}
          onPress={onFormSubmit}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default ProductForm;
