import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button, StyleSheet } from "react-native";
import EnterEmail from "../screens/EnterEmail";
import EnterPassword from "../screens/EnterPassword";
import IconButton from "../components/atoms/IconButton";
import CreateAccount from "../screens/CreateAccount";
import ForgotPassword from "../screens/ForgotPassword";
import PasswordReset from "../screens/PasswordReset";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  const { logout }: any = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>You're Authenticated!</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          logout();
        }}
      />
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
