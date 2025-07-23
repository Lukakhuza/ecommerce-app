import { SafeAreaView } from "react-native";
import AuthStack from "./AuthStack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const MainNavigation = () => {
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
        <AuthStack />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default MainNavigation;
