import { NavigatorScreenParams } from '@react-navigation/core';
import { CompositeScreenProps } from '@react-navigation/core';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackNavigatorParamList = {
  ItemList: undefined;
  ItemDetail: { itemId: string; title: string };
  Cart: { itemId: string };
};

export type ProductsStackNavigatorParamList = {
  ProductsList: undefined;
  ProductCrud: { itemId?: string; title?: string };
};

export type AuthStackNavigatorParamList = {
  Login: undefined;
  Signup: undefined;
};

export type RootNavigatorParamList = {
  Home: NavigatorScreenParams<MainStackNavigatorParamList>;
  Orders: undefined;
  Products: NavigatorScreenParams<ProductsStackNavigatorParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorParamList {}
  }
}

export type RootNavigationProps = CompositeScreenProps<
  DrawerScreenProps<RootNavigatorParamList, 'Home'>,
  NativeStackScreenProps<StackNavigatorParamList, 'Cart'>
>;
