import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Root from "./navigation/Root";
import AuthContextProvider from "./store/auth-context";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
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
