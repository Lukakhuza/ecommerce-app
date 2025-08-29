import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Root from "./navigation/Root";
// import AuthContextProvider from "./store/auth-context";
import AuthContextProvider from "./store/auth-context";
import UserInputContextProvider from "./store/user-input";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <UserInputContextProvider>
          <Root />
        </UserInputContextProvider>
      </AuthContextProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
