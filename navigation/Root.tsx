import { SafeAreaView } from "react-native";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";
import { AuthContext } from "../store/auth-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useContext } from "react";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const Root = () => {
  const authCtx: any = useContext(AuthContext);
  return (
    <NavigationContainer theme={Theme}>
      <SafeAreaView
        style={{
          flex: 1,
          //   paddingTop: 30,
          //   backgroundColor: "yellow",
          paddingHorizontal: 30,
        }}
      >
        {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Root;
