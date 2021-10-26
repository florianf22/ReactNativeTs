import React from 'react';
import { Text, TextProps } from 'react-native';

const TextStyledBold: React.FC<TextProps> = props => {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'MulishBold' }]}>
      {props.children}
    </Text>
  );
};

export default TextStyledBold;
