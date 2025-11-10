import { SafeAreaView, StyleSheet } from "react-native";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";
import { AuthContext } from "../store/auth-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useContext } from "react";
import LoadingOverlay from "../components/atoms/LoadingOverlay";
import { Colors } from "../constants/colors";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.transparent,
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
      <SafeAreaView style={styles.safeArea}>
        {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Root;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
