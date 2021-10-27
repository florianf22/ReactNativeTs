import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthStackNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
