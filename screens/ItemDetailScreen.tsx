import React, { useContext, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
//
import {
  MainStackNavigatorParamList,
  RootNavigatorParamList,
} from '../navigators/types';
import { ItemContext } from '../context/items-context/ItemsContext';
import ListDetail from '../components/ListDetail';
import useNavigationGoBack from '../hooks/useNavigationGoBack';
import { CompositeScreenProps } from '@react-navigation/core';
import { DrawerScreenProps } from '@react-navigation/drawer';

// type Props = CompositeScreenProps<
//   DrawerScreenProps<RootNavigatorParamList, 'Home'>,
//   NativeStackScreenProps<MainStackNavigatorParamList, 'ItemDetail'>
// >;

type Props = NativeStackScreenProps<MainStackNavigatorParamList, 'ItemDetail'>;

interface ItemDetailScreenProps {}

const ItemDetailScreen: React.FC<ItemDetailScreenProps & Props> = ({
  navigation,
  route,
}) => {
  const { dispatch, item } = useContext(ItemContext);
  useNavigationGoBack('ItemList');
  const { itemId } = route.params;

  useLayoutEffect(() => {
    dispatch({ type: 'get_item', payload: itemId });
  }, []);

  if (!item) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={styles.container}>
      <ListDetail item={item} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ItemDetailScreen;
