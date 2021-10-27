import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
//
import Colors from '../constants/Colors';
import ListItem from '../components/ListItem';
import {
  MainStackNavigatorParamList,
  RootNavigatorParamList,
} from '../navigators/types';
import { ItemContext } from '../context/items-context/ItemsContext';
import Item from '../types/Item';
import Button from '../components/Button';
import itemActions from '../actions/itemActions';
import useFetchWhenNavigating from '../hooks/useFetchWhenNavigating';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/core';

type Props = CompositeScreenProps<
  DrawerScreenProps<RootNavigatorParamList, 'Products'>,
  NativeStackScreenProps<MainStackNavigatorParamList, 'ItemList'>
>;

interface ItemListScreenProps {
  title: string;
}

const ItemListScreen: React.FC<Props & ItemListScreenProps> = ({
  navigation,
}) => {
  const { items } = useContext(ItemContext);
  const { setItems, loading, error } = itemActions();
  useFetchWhenNavigating();

  const navigateToDetails = (item: Item): void => {
    navigation.navigate('ItemDetail', {
      itemId: item.id,
      title: item.name,
    });
  };

  const navigateToCart = (item: Item): void => {
    navigation.navigate('Cart', { itemId: item.id });
  };

  useEffect(() => {
    setItems();
  }, [setItems]);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            buttonLeft={{
              title: 'Details',
              navigate: () => navigateToDetails(item),
            }}
            buttonRight={{
              title: 'Cart',
              navigate: () => navigateToCart(item),
            }}
            checkIfAdded
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={() => setItems()}
        refreshing={loading}
      />
      <Button title="Logout" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default ItemListScreen;
