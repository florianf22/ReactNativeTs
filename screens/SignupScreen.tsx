import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
//
import useFormReducer from '../hooks/useFormReducer';
import Button from '../components/Button';
import { UserSignup } from '../types/user';
import Input from '../components/Input';
import authActions from '../actions/authActions';

type inputKeys = keyof UserSignup;

const basicInputs = ['email', 'password', 'passwordConfirm'] as const;

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const { state, dispatch } = useFormReducer<UserSignup>({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { signup } = authActions();

  const onChangeText = (value: string, inputValue: inputKeys): void => {
    dispatch({ type: 'update_input', payload: { title: inputValue, value } });
  };

  const onFormSubmit = (): void => {
    if (state.inputValues.password !== state.inputValues.passwordConfirm) {
      return Alert.alert('Password not matching');
    }

    signup(state.inputValues.email, state.inputValues.password);
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
            value={state.inputValues[inputName as inputKeys]}
            onChangeText={value => onChangeText(value, inputName as inputKeys)}
            type="contained"
            key={inputName}
            errMessage={state.inputErrMessages[inputName as inputKeys] || ''}
          />
        ))}

        <Button style={styles.button} title="Log in" onPress={onFormSubmit} />
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

export default Signup;
