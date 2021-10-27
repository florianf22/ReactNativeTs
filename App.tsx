import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
//
import { ItemContextProvider } from './context/items-context/ItemsContext';
import { CartContextProvider } from './context/cart-context/CartContext';
import {
  AuthContext,
  AuthContextProvider,
} from './context/auth-context/AuthContext';
import RootNavigator from './navigators/TabNavigator';
import AuthNavigator from './navigators/AuthNavigator';

const AppNavigator: React.FC = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) return <AuthNavigator />;

  return <RootNavigator />;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    MulishBold: require('./assets/fonts/Mulish-Bold.ttf'),
    MulishRegular: require('./assets/fonts/Mulish-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthContextProvider>
      <CartContextProvider>
        <ItemContextProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ItemContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}
