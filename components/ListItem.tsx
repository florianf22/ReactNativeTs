import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//
import Item from '../types/Item';
import TextStyledRegular from '../components/TextStyledRegular';
import Button from './Button';
import Colors from '../constants/Colors';
import TextStyledBold from './TextStyledBold';
import { currencyFormatter } from '../utils';
import { MainStackNavigatorParamList } from '../navigators/types';
import { CartContext } from '../context/cart-context/CartContext';
import useCartAddDispatch from '../hooks/useCartAddDispatch';

interface ListItemProps {
  item: Item;
  buttonLeft: { title: string; navigate: () => void };
  buttonRight: { title: string; navigate: () => void };
  checkIfAdded?: boolean;
}

type ListItemScreenProp = NativeStackNavigationProp<
  MainStackNavigatorParamList,
  'ItemDetail'
>;

const ListItem: React.FC<ListItemProps> = ({
  item,
  buttonLeft,
  buttonRight,
  checkIfAdded,
}) => {
  const navigation = useNavigation();
  const { addItemToCart } = useCartAddDispatch(item);

  const checkForAddedInCart = (): void => {
    if (checkIfAdded) {
      addItemToCart(() => buttonRight.navigate());
    } else {
      buttonRight.navigate();
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Image source={{ uri: item.imageUrl }} style={styles.img} />
        <View style={styles.innerContainer}>
          <Button title={buttonLeft.title} onPress={buttonLeft.navigate} />
          <View style={styles.textPriceWrapper}>
            <TextStyledBold style={styles.textPrice}>
              {`${currencyFormatter(item.price)}$`}
            </TextStyledBold>
          </View>
          <Button title={buttonRight.title} onPress={checkForAddedInCart} />
        </View>

        <TextStyledRegular style={styles.textTitle}>
          {item.name}
        </TextStyledRegular>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 230,
    marginHorizontal: 40,
    marginTop: 30,
    borderRadius: 5,
    paddingBottom: 10,
    overflow: 'hidden',

    position: 'relative',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  img: {
    height: '80%',
    width: '100%',
    resizeMode: 'cover',
  },
  textTitle: {
    marginHorizontal: 10,
    fontSize: 18,
    position: 'absolute',
    bottom: 60,
    left: 10,

    color: Colors.white,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textPriceWrapper: {
    borderBottomWidth: 1,
    borderColor: Colors.black,
    paddingBottom: 5,
    transform: [{ translateY: 2 }],
  },
  textPrice: {
    color: Colors.black,
    fontSize: 20,
  },
});

export default ListItem;
