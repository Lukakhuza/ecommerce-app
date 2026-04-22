/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { hide } from 'react-native-bootsplash';
import Config from 'react-native-config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import AuthContextProvider from './src/store/auth-context';
import CartContextProvider from './src/store/cart-context';
import CheckoutContextProvider from './src/store/checkout-context';
import FavoritesContextProvider from './src/store/favorites-context';
import ProductsContextProvider from './src/store/products-context';
import UserInputContextProvider from './src/store/user-input-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await hide();

      setIsReady(true);
    };

    init();
  }, []);

  if (!isReady) return null;

  return (
    <StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_KEY!}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AuthContextProvider>
          <UserInputContextProvider>
            <ProductsContextProvider>
              <FavoritesContextProvider>
                <CartContextProvider>
                  <CheckoutContextProvider>
                    <NavigationContainer>
                      <RootNavigator />
                    </NavigationContainer>
                  </CheckoutContextProvider>
                </CartContextProvider>
              </FavoritesContextProvider>
            </ProductsContextProvider>
          </UserInputContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </StripeProvider>
  );
}

export default App;
