import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//
import MainStackNavigator from './MainStackNavigator';
import OrdersScreen from '../screens/OrdersScreen';
import ProductsStackNavigator from './ProductsStackNavigator';
import Colors from '../constants/Colors';
import { RootNavigatorParamList } from './types';
import { navigationOptions } from './NavigationOptions';

const Drawer = createDrawerNavigator<RootNavigatorParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: Colors.primary,
        drawerContentStyle: {
          backgroundColor: Colors.white,
          // marginTop: 10,
        },
        drawerActiveTintColor: Colors.white,
        drawerInactiveTintColor: Colors.black,
        drawerLabelStyle: {
          fontFamily: 'MulishBold',
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Feather
              name="home"
              size={size}
              color={focused ? Colors.white : Colors.black}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Feather
              name="shopping-cart"
              size={size}
              color={focused ? Colors.white : Colors.black}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Products"
        component={ProductsStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Feather
              name="align-center"
              size={size}
              color={focused ? Colors.white : Colors.black}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
