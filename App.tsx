import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
//
import { ItemContextProvider } from './context/items-context/ItemsContext';
import { CartContextProvider } from './context/cart-context/CartContext';
import RootNavigator from './navigators/TabNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    MulishBold: require('./assets/fonts/Mulish-Bold.ttf'),
    MulishRegular: require('./assets/fonts/Mulish-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <CartContextProvider>
      <ItemContextProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ItemContextProvider>
    </CartContextProvider>
  );
}
