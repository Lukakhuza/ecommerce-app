import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button, StyleSheet } from "react-native";
import EnterEmail from "../screens/LoginAndOnboardingScreens/EnterEmail";
import EnterPassword from "../screens/LoginAndOnboardingScreens/EnterPassword";
import IconButton from "../components/atoms/IconButton";
import CreateAccount from "../screens/LoginAndOnboardingScreens/CreateAccount";
import ForgotPassword from "../screens/LoginAndOnboardingScreens/ForgotPassword";
import PasswordReset from "../screens/LoginAndOnboardingScreens/PasswordReset";
import Categories from "../screens/AuthenticatedScreens/Categories";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

// import { useEffect, useContext } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { UserInputContext } from "../store/context/userInputContext";
// import { AuthContext } from "../store/context/auth-context";
// import { FavoritesContext } from "../store/context/favoritesContext";

// import HomePage from "../screens/Welcome/HomePage";
// import Notifications from "../screens/Notifications/Notifications";
// import Orders from "../screens/Orders/Orders";
// import ProfileSettings from "../screens/Settings/ProfileSettings";
// import ProductDetails from "../screens/ProductPage/ProductDetails";
// import IconButton from "../components/ui/IconButton";
// import CategoriesSearchAndFilter from "../screens/SearchAndFilter/CategoriesSearchAndFilter";
import Notifications from "../screens/AuthenticatedScreens/Notifications";
// import Welcome from "../screens/Welcome/welcome";

import Orders from "../screens/AuthenticatedScreens/Orders";
import ProfileSettings from "../screens/AuthenticatedScreens/Settings/ProfileSettings";
import ManageUserData from "../screens/AuthenticatedScreens/Settings/ManageUserData";
import ManageUserAddress from "../screens/AuthenticatedScreens/Settings/ManageUserAddress";
// import Cart from "../screens/CartAndCheckout/Cart";
// import ManageUserAddress from "../screens/ManageUserAddress";
// import ManageUserData from "../screens/ManageUserData";
// import Checkout from "../screens/Orders/Checkout";
// import Payment from "../screens/Settings/Payment";
// import Favorites from "../screens/ProductPage/Favorites";
import TabsOverview from "./BottomTabs";
// import Categories from "../screens/Categories";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName="TabsOverview">
      <Stack.Screen
        name="TabsOverview"
        component={TabsOverview}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
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
