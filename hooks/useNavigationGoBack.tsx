import React, { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
//
import Colors from '../constants/Colors';

const useNavigationGoBack = (rootName: string) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        // global ReactNavigation namespace is declared and it won't navigate to ItemList, type checks it.
        // @ts-ignore
        <TouchableOpacity onPress={() => navigation.navigate(rootName)}>
          <Ionicons
            name="ios-return-down-back"
            size={24}
            color={Colors.white}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
};

export default useNavigationGoBack;
