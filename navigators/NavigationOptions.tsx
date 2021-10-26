import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//
import Colors from '../constants/Colors';

export const navigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.white,
  },
  headerTintColor: Platform.OS === 'android' ? Colors.white : Colors.primary,
  headerTitleStyle: {
    fontFamily: 'MulishBold',
  },
  headerTitleAlign: 'center',
};
