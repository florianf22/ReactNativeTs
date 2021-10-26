import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
//
import ListItem from '../components/ListItem';
import { ItemContext } from '../context/items-context/ItemsContext';
import Colors from '../constants/Colors';
import Item from '../types/Item';
import { CompositeScreenProps } from '@react-navigation/core';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
  ProductsStackNavigatorParamList,
  RootNavigatorParamList,
} from '../navigators/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import itemActions from '../actions/itemActions';
import useFetchWhenNavigating from '../hooks/useFetchWhenNavigating';

type Props = CompositeScreenProps<
  DrawerScreenProps<RootNavigatorParamList, 'Products'>,
  NativeStackScreenProps<ProductsStackNavigatorParamList, 'ProductsList'>
>;

interface ProductsScreenProps {}

const ProductsScreen: React.FC<ProductsScreenProps & Props> = ({
  navigation,
}) => {
  const { items, dispatch, item } = useContext(ItemContext);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState('');
  const { deleteItem: deleteItemServer, setItems } = itemActions();
  useFetchWhenNavigating();

  useLayoutEffect(() => {
    (async () => {
      if (shouldDelete && itemIdToDelete) {
        Promise.all([deleteItemServer(itemIdToDelete), setItems()]);
      }
    })();
  }, [shouldDelete]);

  const deleteItem = (item: Item) => {
    alert();
    setItemIdToDelete(item.id);
  };

  const editItem = (item: Item) => {
    navigation.navigate('ProductCrud', { itemId: item.id, title: item.name });
    dispatch({ type: 'get_item', payload: item.id });
  };

  const alert = () => {
    Alert.alert('Are you sure that you want to delete the item?', '', [
      {
        text: 'Yes',
        onPress: () => setShouldDelete(true),
      },
      {
        text: 'No',
        onPress: () => setShouldDelete(false),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            buttonLeft={{
              title: 'Edit',
              navigate: () => editItem(item),
            }}
            buttonRight={{
              title: 'Delete',
              navigate: () => deleteItem(item),
            }}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default ProductsScreen;
