import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Root from "./navigation/Root";
// import AuthContextProvider from "./store/auth-context";
import AuthContextProvider from "./store/auth-context";
import UserInputContextProvider from "./store/user-input-context";
import * as SplashScreen from "expo-splash-screen";
import ProductsContextProvider from "./store/products-context";
import FavoritesContextProvider from "./store/favorites-context";
import { Colors } from "./constants/colors";

SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <UserInputContextProvider>
          <ProductsContextProvider>
            <FavoritesContextProvider>
              <Root />
            </FavoritesContextProvider>
          </ProductsContextProvider>
        </UserInputContextProvider>
      </AuthContextProvider>
    </View>
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
