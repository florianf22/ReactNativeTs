import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
//
import Item from '../types/Item';
import TextStyledBold from './TextStyledBold';
import { currencyFormatter } from '../utils';
import TextStyledRegular from './TextStyledRegular';
import Button from './Button';
import { MainStackNavigatorParamList } from '../navigators/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartContext } from '../context/cart-context/CartContext';
import useCartAddDispatch from '../hooks/useCartAddDispatch';

interface ListDetailProps {
  item: Item;
}

type ListDetailScreenProp = NativeStackNavigationProp<
  MainStackNavigatorParamList,
  'ItemDetail'
>;

const ListDetail: React.FC<ListDetailProps> = ({ item }) => {
  const navigation = useNavigation<ListDetailScreenProp>();
  const { dispatch } = useContext(CartContext);
  const { addItemToCart } = useCartAddDispatch(item);

  const navigateToCart = (): void => {
    addItemToCart(() => navigation.navigate('Cart', { itemId: +item.id }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
      <TextStyledBold style={styles.textPrice}>{`${currencyFormatter(
        item.price
      )}$`}</TextStyledBold>
      <TextStyledRegular style={styles.textDesc}>
        {item.description}
      </TextStyledRegular>
      <Button title="Cart" style={styles.button} onPress={navigateToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '80%',
    marginHorizontal: '10%',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 7,
    overflow: 'hidden',
  },
  imgContainer: {
    height: 250,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textPrice: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
  },
  textDesc: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default ListDetail;
