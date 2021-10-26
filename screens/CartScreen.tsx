import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
//
import { CartContext } from '../context/cart-context/CartContext';
import TextStyledBold from '../components/TextStyledBold';
import TextStyledRegular from '../components/TextStyledRegular';
import { currencyFormatter } from '../utils';
import CartRow from '../components/CartRow';
import useNavigationGoBack from '../hooks/useNavigationGoBack';

interface CartScreenProps {}

const CartScreen: React.FC<CartScreenProps> = () => {
  const { items, totalSum, dispatch } = useContext(CartContext);
  useNavigationGoBack('ItemList');

  const sortItems = (): void => {
    dispatch({ type: 'sort' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextStyledRegular style={styles.text}>Total Sum</TextStyledRegular>
        <TextStyledBold style={styles.text}>{`${currencyFormatter(
          totalSum
        )}$`}</TextStyledBold>
        <TouchableOpacity onPress={sortItems}>
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={({ item: itemOBj }) => (
          <CartRow item={itemOBj.item} quantity={itemOBj.quantity} />
        )}
        // FIXME: ID needed
        keyExtractor={item => item.item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
  },
  list: {
    marginTop: 20,
  },
});

export default CartScreen;
