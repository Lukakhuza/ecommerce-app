import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import EnterEmail from "../screens/EnterEmail";
import EnterPassword from "../screens/EnterPassword";
import IconButton from "../components/atoms/IconButton";
import CreateAccount from "../screens/CreateAccount";
import ForgotPassword from "../screens/ForgotPassword";
import PasswordReset from "../screens/PasswordReset";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  return (
    <View style={styles.container}>
      <Text>You're Authenticated!</Text>
    </View>
    // <Stack.Navigator initialRouteName="EnterEmail">
    //   <Stack.Screen
    //     name="EnterEmail"
    //     component={EnterEmail}
    //     options={{ headerShown: false }}
    //   />
    // </Stack.Navigator>
  );
};

export default AuthenticatedStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
