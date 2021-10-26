import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import ItemListScreen from '../screens/ItemListScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import CartScreen from '../screens/CartScreen';
//
import { ProductsStackNavigatorParamList } from './types';
import Colors from '../constants/Colors';
import { navigationOptions } from './NavigationOptions';
import ProductsScreen from '../screens/ProductsScreen';
import ProductCrudScreen from '../screens/ProductCrudScreen';

const Stack = createNativeStackNavigator<ProductsStackNavigatorParamList>();

const ProductsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      // FIXME: navigation is of type any
      // @ts-ignore
      screenOptions={({ navigation }) => ({
        ...navigationOptions,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Ionicons name="menu-outline" size={26} color={Colors.white} />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="ProductsList"
        component={ProductsScreen}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductCrud')}
            >
              <Feather name="plus" size={24} color={Colors.white} />
            </TouchableOpacity>
          ),
          title: 'Manage Products',
        })}
      />
      <Stack.Screen
        name="ProductCrud"
        component={ProductCrudScreen}
        options={({ navigation, route }) => ({
          title: route.params?.title || 'Create new Product',
        })}
      />
    </Stack.Navigator>
  );
};

export default ProductsStackNavigator;
