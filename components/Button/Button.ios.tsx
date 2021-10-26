// IOS will pick this file. Android the other
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Colors from '../../constants/Colors';
//
import TextStyledBold from '../TextStyledBold';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <TextStyledBold style={styles.text}>{props.title}</TextStyledBold>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 18,
    color: Colors.primary,
  },
});

export default Button;
