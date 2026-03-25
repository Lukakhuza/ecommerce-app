/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import FavoritesContextProvider from './src/store/favorites-context';
import CartContextProvider from './src/store/cart-context';
import CheckoutContextProvider from './src/store/checkout-context';
import ProductsContextProvider from './src/store/products-context';
import AuthContextProvider from './src/store/auth-context';
import UserInputContextProvider from './src/store/user-input-context';
import { StripeProvider } from '@stripe/stripe-react-native';
import { hide } from 'react-native-bootsplash';
import Config from 'react-native-config';
import { useEffect, useState } from 'react';
import LoadingOverlay from './src/components/atoms/LoadingOverlay';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // await new Promise<void>(resolve => setTimeout(resolve, 500));
      await hide({ fade: true });

      setIsReady(true);
    };

    init();
    // requestAnimationFrame(() => {
    //   hide();
    // });
  }, []);

  if (!isReady) return <LoadingOverlay message="I am here" />;

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
