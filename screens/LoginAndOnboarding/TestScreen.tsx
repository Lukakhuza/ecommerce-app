import { Button, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}

async function deleteItem(key: string) {
  const result = await SecureStore.deleteItemAsync(key);
  alert(result);
}

const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Save Key"
        onPress={() => {
          save("somekey", "somevalue");
        }}
      />
      <View style={{ marginVertical: 20 }}></View>
      <Button
        title="Get Value"
        onPress={() => {
          getValueFor("somekey");
        }}
      />
      <View style={{ marginVertical: 20 }}></View>
      <Button
        title="Delete"
        onPress={() => {
          deleteItem("somekey");
        }}
      />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
