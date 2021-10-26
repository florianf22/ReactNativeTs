import React from 'react';
import { Text, TextProps } from 'react-native';

const TextStyledRegular: React.FC<TextProps> = props => {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'MulishRegular' }]}>
      {props.children}
    </Text>
  );
};

export default TextStyledRegular;
