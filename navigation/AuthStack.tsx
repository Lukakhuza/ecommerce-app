import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnterEmail from "../screens/EnterEmail";
import EnterPassword from "../screens/EnterPassword";
import IconButton from "../components/atoms/IconButton";
import CreateAccount from "../screens/CreateAccount";
import ForgotPassword from "../screens/ForgotPassword";
import PasswordReset from "../screens/PasswordReset";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="EnterEmail">
      <Stack.Screen
        name="EnterEmail"
        component={EnterEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EnterPassword"
        component={EnterPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={({ navigation: { goBack } }) => ({
          title: "",
          headerTransparent: true,
          headerLeft: ({ tintColor }) => (
            <IconButton
              style={{}}
              icon="chevron-back-circle-outline"
              size={32}
              color={tintColor}
              onPress={goBack}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={({ navigation }) => ({
          title: "",
          headerTransparent: true,
          headerLeft: ({ tintColor }) => (
            <IconButton
              style={{}}
              icon="chevron-back-circle-outline"
              size={32}
              color={tintColor}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordReset}
        options={{ headerShown: false }}
      />
      {/*
      <Stack.Screen
        name="TellUsAboutYourself"
        component={TellUsAboutYourself}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
