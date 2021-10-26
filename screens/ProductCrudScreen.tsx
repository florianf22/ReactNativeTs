import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import uuid from 'react-native-uuid';
//
import useNavigationGoBack from '../hooks/useNavigationGoBack';
import { ProductsStackNavigatorParamList } from '../navigators/types';
import { ItemContext } from '../context/items-context/ItemsContext';
import ProductForm from '../components/ProductForm';
import itemActions from '../actions/itemActions';

type Prop = NativeStackScreenProps<
  ProductsStackNavigatorParamList,
  'ProductCrud'
>;

interface ProductCrudProps {}

const ProductCrudScreen: React.FC<ProductCrudProps & Prop> = ({
  navigation,
  route,
}) => {
  const { items, item, dispatch } = useContext(ItemContext);
  useNavigationGoBack('ProductsList');
  const itemId = route.params?.itemId;
  const { addItem: addItemServer, editItem: editItemServer } = itemActions();

  const goBack = () => navigation.goBack();

  const addItem = (
    title: string,
    price: string,
    description: string,
    imageUrl: string
  ) => {
    addItemServer(
      {
        id: uuid.v4().toString(),
        name: title,
        price: +price,
        description,
        imageUrl,
      },
      goBack
    );
  };

  const editItem = (
    title: string,
    price: string,
    description: string,
    imageUrl: string
  ): void => {
    if (itemId) {
      editItemServer(
        {
          id: itemId,
          name: title,
          price: +price,
          description,
          imageUrl,
        },
        goBack
      );
    }
  };

  return (
    <ProductForm
      title={itemId && item?.name ? item.name : ''}
      price={itemId && item?.price ? item.price.toString() : ''}
      description={itemId && item?.description ? item.description : ''}
      url={itemId && item?.imageUrl ? item.imageUrl : ''}
      buttonTitle={itemId ? 'Edit item' : 'Add item'}
      submitFunc={itemId ? editItem : addItem}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductCrudScreen;
