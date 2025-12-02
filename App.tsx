import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Root from "./navigation/Root";
import AuthContextProvider from "./store/auth-context";
import UserInputContextProvider from "./store/user-input-context";
import * as SplashScreen from "expo-splash-screen";
import ProductsContextProvider from "./store/products-context";
import FavoritesContextProvider from "./store/favorites-context";
import CheckoutContextProvider from "./store/checkout-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Colors } from "./constants/colors";
import CartContextProvider from "./store/cart-context";

SplashScreen.preventAutoHideAsync();
// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     console.log("Hiiii ");
//     return {
//       shouldPlaySound: true,
//       shouldSetBadge: true,
//       shouldShowBanner: true,
//     };
//   },
// });

const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51RcOFcISNRc7F3XzZvmoJb7xy08hi7Sd359omPvm24EA3x9c91D14cemNu8XWHUM7ewOqq633r4oVowEWLb18Pnv00OpDDFjzU">
      <View style={styles.container}>
        <StatusBar style="auto" />
        <AuthContextProvider>
          <UserInputContextProvider>
            <ProductsContextProvider>
              <FavoritesContextProvider>
                <CartContextProvider>
                  <CheckoutContextProvider>
                    <Root />
                  </CheckoutContextProvider>
                </CartContextProvider>
              </FavoritesContextProvider>
            </ProductsContextProvider>
          </UserInputContextProvider>
        </AuthContextProvider>
      </View>
    </StripeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white100,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
