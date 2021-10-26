import React from 'react';
import {
  Platform,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
} from 'react-native';
//
import ButtonAndroid from './Button.android';
import ButtonIOS from './Button.ios';

const ButtonElement = Platform.OS === 'android' ? ButtonAndroid : ButtonIOS;

interface ButtonProps {
  title: string;
}

const Button: React.FC<
  ButtonProps & TouchableOpacityProps & TouchableNativeFeedbackProps
> = props => {
  return <ButtonElement {...props} />;
};

export default Button;
