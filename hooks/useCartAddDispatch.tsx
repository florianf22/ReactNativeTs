import React, { useContext, useState } from 'react';
//
import { Alert } from 'react-native';
import { CartContext } from '../context/cart-context/CartContext';
import Item from '../types/Item';

const useCartAddDispatch = (item: Item) => {
  const { dispatch, items } = useContext(CartContext);

  const addItemToCart = (callback: () => void): void => {
    const itemAlreadyAdded = items.find(it => it.item.id === item.id);

    if (itemAlreadyAdded) {
      Alert.alert('The item has already been added to cart.');
    } else {
      dispatch({ type: 'add_to_cart', payload: item });
      callback();
    }
  };

  return { addItemToCart };
};

export default useCartAddDispatch;
