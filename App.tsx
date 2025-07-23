import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MainNavigation from "./navigation/MainNavigation";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MainNavigation />
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
