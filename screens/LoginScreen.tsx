import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
//
import useFormReducer from '../hooks/useFormReducer';
import Button from '../components/Button';
import { User } from '../types/user';
import Input from '../components/Input';
import authActions from '../actions/authActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextStyledBold from '../components/TextStyledBold';
import TextStyledRegular from '../components/TextStyledRegular';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackNavigatorParamList } from '../navigators/types';

type inputKeys = keyof User;

const basicInputs = ['email', 'password'] as const;

type Props = NativeStackScreenProps<AuthStackNavigatorParamList, 'Login'>;

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps & Props> = ({ navigation }) => {
  const { state, dispatch } = useFormReducer<User>({ email: '', password: '' });
  const { login } = authActions();

  const onChangeText = (value: string, inputValue: inputKeys): void => {
    dispatch({ type: 'update_input', payload: { title: inputValue, value } });
  };

  const onFormSubmit = (): void => {
    login(state.inputValues.email, state.inputValues.password);
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
            type="contained"
            key={inputName}
            errMessage={state.inputErrMessages[inputName] || ''}
          />
        ))}

        <Button style={styles.button} title="Log in" onPress={onFormSubmit} />
        <TouchableOpacity
          style={styles.navigateBtn}
          onPress={() => navigation.navigate('Signup')}
        >
          <TextStyledRegular style={styles.centeredText}>
            If you haven't got an account, sign up by clicking
            <TextStyledBold style={styles.here}>here</TextStyledBold>
          </TextStyledRegular>
        </TouchableOpacity>
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
  navigateBtn: {
    marginTop: 20,
  },
  centeredText: {
    textAlign: 'center',
  },
  here: {
    // marginLeft: 7,
  },
});

export default LoginScreen;
