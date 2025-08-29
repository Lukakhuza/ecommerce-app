import { SafeAreaView } from "react-native";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";
import { AuthContext } from "../store/auth-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "../components/atoms/LoadingOverlay";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const Root = () => {
  const authCtx: any = useContext(AuthContext);
  // Check if the user is already logged in on the device (if there is a token in device's secure store).

  if (authCtx.loading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <NavigationContainer theme={Theme}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Root;
