import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MainNavigation from "./navigation/MainNavigation";
import AuthContextProvider from "./store/auth-context";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <MainNavigation />
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
