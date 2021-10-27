import React from 'react';
import { TouchableOpacity } from 'react-native';
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
import { MainStackNavigatorParamList } from './types';
import Colors from '../constants/Colors';
import { navigationOptions } from './NavigationOptions';

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

const MainStackNavigator: React.FC = () => {
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
        name="ItemList"
        component={ItemListScreen}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart', { itemId: 1 })}
            >
              <Feather name="shopping-cart" size={22} color={Colors.white} />
            </TouchableOpacity>
          ),
          title: 'HOME',
        })}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
        options={({ navigation, route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
