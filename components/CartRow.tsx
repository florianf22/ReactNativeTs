import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
//
import { currencyFormatter } from '../utils';
import TextStyledBold from './TextStyledBold';
import TextStyledRegular from './TextStyledRegular';
import Item from '../types/Item';
import { CartContext } from '../context/cart-context/CartContext';
import Colors from '../constants/Colors';

interface CartRowProps {
  item: Item;
  quantity: number;
}

const CartRow: React.FC<CartRowProps> = ({ item, quantity }) => {
  const { dispatch } = useContext(CartContext);

  const incrementItemQuantity = (): void => {
    dispatch({ type: 'increment', payload: +item.id });
  };

  const decrementItemQuantity = (): void => {
    dispatch({ type: 'decrement', payload: +item.id });
  };

  const deleteItem = (): void => {
    dispatch({ type: 'remove_from_cart', payload: +item.id });
  };

  return (
    <View style={[styles.row, styles.marginTop]}>
      <View style={styles.row}>
        <TextStyledBold style={[styles.text, styles.marginRight]}>
          {quantity}
        </TextStyledBold>
        <TextStyledRegular
          style={[styles.text, styles.maxTextWidth]}
          onTextLayout={e => {}}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {item.name}
        </TextStyledRegular>
      </View>

      <View style={styles.row}>
        <TextStyledBold style={[styles.text, styles.marginRight]}>
          {`${currencyFormatter(item.price)}$`}
        </TextStyledBold>
        <TouchableOpacity onPress={incrementItemQuantity}>
          <Feather
            name="arrow-up-circle"
            size={24}
            color={Colors.black}
            style={styles.marginRight}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={decrementItemQuantity}>
          <Feather
            name="arrow-down-circle"
            size={24}
            color={Colors.black}
            style={styles.marginRight}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem}>
          <Feather name="trash" size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
  },
  marginRight: {
    marginRight: 10,
  },
  maxTextWidth: {
    maxWidth: 150,
  },
});

export default CartRow;
