import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import itemActions from '../actions/itemActions';
//
const useFetchWhenNavigating = () => {
  const navigation = useNavigation();
  const { setItems } = itemActions();

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      setItems();
    });

    return () => navigation.removeListener('focus', listener);
  }, [navigation]);
};

export default useFetchWhenNavigating;
