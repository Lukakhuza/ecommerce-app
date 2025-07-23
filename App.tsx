import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ButtonOAuth from "./components/atoms/ButtonOAuth";
import EnterEmail from "./screens/EnterEmail";
import EnterPassword from "./screens/EnterPassword";
import CreateAccount from "./screens/CreateAccount";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <EnterEmail />
      <EnterPassword /> */}
      <CreateAccount />
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
    paddingHorizontal: 30,
  },
});
