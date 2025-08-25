import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button, StyleSheet } from "react-native";
import EnterEmail from "../screens/LoginAndOnboarding/EnterEmail";
import EnterPassword from "../screens/LoginAndOnboarding/EnterPassword";
import IconButton from "../components/atoms/IconButton";
import CreateAccount from "../screens/LoginAndOnboarding/CreateAccount";
import ForgotPassword from "../screens/LoginAndOnboarding/ForgotPassword";
import PasswordReset from "../screens/LoginAndOnboarding/PasswordReset";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

// import { useEffect, useContext } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { UserInputContext } from "../store/context/userInputContext";
// import { AuthContext } from "../store/context/auth-context";
// import { FavoritesContext } from "../store/context/favoritesContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomePage from "../screens/Welcome/HomePage";
// import Notifications from "../screens/Notifications/Notifications";
// import Orders from "../screens/Orders/Orders";
// import ProfileSettings from "../screens/Settings/ProfileSettings";
// import ProductDetails from "../screens/ProductPage/ProductDetails";
// import IconButton from "../components/ui/IconButton";
// import CategoriesSearchAndFilter from "../screens/SearchAndFilter/CategoriesSearchAndFilter";
import Notifications from "../screens/Notifications";
// import Welcome from "../screens/Welcome/welcome";
import { Ionicons } from "@expo/vector-icons";
import Orders from "../screens/Orders";
// import Cart from "../screens/CartAndCheckout/Cart";
// import ManageUserAddress from "../screens/ManageUserAddress";
// import ManageUserData from "../screens/ManageUserData";
// import Checkout from "../screens/Orders/Checkout";
// import Payment from "../screens/Settings/Payment";
// import Favorites from "../screens/ProductPage/Favorites";

// const Stack = createNativeStackNavigator();

const BottomTabs = createBottomTabNavigator();

const TabsOverview = () => {
  return (
    <BottomTabs.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabs.Screen
        name="Home"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

// const AuthenticatedStack = () => {
//   const userInputCtx: any = useContext(UserInputContext);
//   const authCtx: any = useContext(AuthContext);
//   const favoritesCtx: any = useContext(FavoritesContext);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userData = {
//         email: authCtx.authEmail,
//       };
//       if (authCtx.authEmail) {
//         fetch(
//           "https://backend-ecommerce-mobile-app.onrender.com/user/get-user-by-email",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(userData),
//           }
//         )
//           .then((response) => {
//             return response.json();
//           })
//           .then((resData) => {
//             userInputCtx.input.firstName = resData.user.firstName;
//             userInputCtx.input.lastName = resData.user.lastName;
//             userInputCtx.input.email = resData.user.email;
//             userInputCtx.input.passwordPlaceholder = resData.user.password;
//             userInputCtx.input.phoneNumber = resData.user.phoneNumber;
//             userInputCtx.input.address = resData.user.address;
//             userInputCtx.input.shopFor = resData.user.shopFor;
//             userInputCtx.input.cart = resData.user.cart;
//             return resData.user;
//           });
//       }
//     };
//     fetchUserData();
//   }, []);

//   return (
//     <Stack.Navigator initialRouteName="Main">
//       <Stack.Screen
//         name="Main"
//         component={TabsOverview}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="HomePage"
//         component={HomePage}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ProductDetails"
//         component={ProductDetails}
//         options={({ navigation, route }) => ({
//           title: "",
//           headerTransparent: true,
//           headerLeft: ({ tintColor }) => (
//             <IconButton
//               style={{}}
//               icon="chevron-back-circle-outline"
//               size={32}
//               color={tintColor}
//               onPress={() => navigation.goBack()}
//             />
//           ),
//           headerRight: ({ tintColor }) => (
//             <IconButton
//               style={{}}
//               icon={
//                 favoritesCtx.favorites.includes(route.params.product.id)
//                   ? "heart"
//                   : "heart-outline"
//               }
//               size={32}
//               color={tintColor}
//               onPress={() => {
//                 if (!favoritesCtx.favorites.includes(route.params.product.id)) {
//                   favoritesCtx.addFavorite(route.params.product.id);
//                 } else {
//                   favoritesCtx.removeFavorite(route.params.product.id);
//                 }
//               }}
//             />
//           ),
//         })}
//       />
//       <Stack.Screen
//         name="Welcome"
//         component={Welcome}
//         options={({ navigation }) => ({
//           title: "",
//           headerTransparent: true,
//           headerLeft: ({ tintColor }) => (
//             <IconButton
//               style={{}}
//               icon="chevron-back-circle-outline"
//               size={32}
//               color={tintColor}
//               onPress={() => navigation.goBack()}
//             />
//           ),
//         })}
//       />
//       <Stack.Screen
//         name="CategoriesList"
//         component={CategoriesSearchAndFilter}
//         options={({ navigation }) => ({
//           title: "",
//           headerTransparent: true,
//           headerLeft: ({ tintColor }) => (
//             <IconButton
//               style={{}}
//               icon="chevron-back-circle-outline"
//               size={32}
//               color={tintColor}
//               onPress={() => navigation.goBack()}
//             />
//           ),
//         })}
//       />
//       <Stack.Screen
//         name="CategoriesSearchAndFilter"
//         component={CategoriesSearchAndFilter}
//         options={({ navigation }) => ({
//           headerShown: false,
//         })}
//       />
//       <Stack.Screen
//         name="Cart"
//         component={Cart}
//         options={({ navigation }) => ({
//           title: "",
//           headerTransparent: true,
//           headerLeft: ({ tintColor }) => (
//             <IconButton
//               style={{}}
//               icon="chevron-back-circle-outline"
//               size={32}
//               color={tintColor}
//               onPress={() => navigation.goBack()}
//             />
//           ),
//         })}
//       />
//       <Stack.Screen
//         name="ManageUserData"
//         component={ManageUserData}
//         options={{ presentation: "modal" }}
//         // @TODO klj
//         // {({ navigation }) => ({
//         //   title: "",
//         //   headerTransparent: true,
//         //   headerLeft: ({ tintColor }) => (
//         //     <IconButton
//         //       icon="chevron-back-circle-outline"
//         //       size={32}
//         //       color={tintColor}
//         //       onPress={() => navigation.goBack()}
//         //     />
//         //   ),
//         // })}
//       />
//       <Stack.Screen
//         name="ManageUserAddress"
//         component={ManageUserAddress}
//         options={{ presentation: "modal" }}
//         // {({ navigation }) => ({
//         //   title: "",
//         //   headerTransparent: true,
//         //   headerLeft: ({ tintColor }) => (
//         //     <IconButton
//         //       icon="chevron-back-circle-outline"
//         //       size={32}
//         //       color={tintColor}
//         //       onPress={() => navigation.goBack()}
//         //     />
//         //   ),
//         // })}
//       />
//       <Stack.Screen
//         name="Favorites"
//         component={Favorites}
//         options={({ navigation }) => ({
//           // headerShown: false,
//           title: "Favorites",
//           headerTitleStyle: { fontSize: 21 },
//           presentation: "card",
//           headerTransparent: true,
//           headerLeft: ({ tintColor }) => (
//             <IconButton
//               icon="chevron-back-circle-outline"
//               size={35}
//               color="black"
//               onPress={() => navigation.goBack()}
//               style={{ backgroundColor: "none" }}
//             />
//           ),
//         })}
//       />
//       <Stack.Screen
//         name="Payment"
//         component={Payment}
//         // options={({ navigation }) => ({
//         //   // headerShown: false,
//         //   title: "Favorites",
//         //   headerTitleStyle: { fontSize: 21 },
//         //   presentation: "card",
//         //   headerTransparent: true,
//         //   headerLeft: ({ tintColor }) => (
//         //     <IconButton
//         //       icon="chevron-back-circle-outline"
//         //       size={35}
//         //       color="black"
//         //       onPress={() => navigation.goBack()}
//         //       style={{ backgroundColor: "none" }}
//         //     />
//         //   ),
//         // })}
//       />
//       <Stack.Screen name="Checkout" component={Checkout} />
//     </Stack.Navigator>
//   );
// };

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  const { logout }: any = useContext(AuthContext);
  return <TabsOverview />;
  // <View style={styles.container}><TabsOverview/>
  // <Stack.Screen
  //   name="Main"
  //   component={TabsOverview}
  //   options={{ headerShown: false }}
  // />
  // <Stack.Screen
  //   name="HomePage"
  //   component={HomePage}
  //   options={{ headerShown: false }}
  // />
  {
    /* <TabsOverview /> */
  }
  {
    /* <Text>You're Authenticated!</Text> */
  }
  {
    /* <Button
        title="Sign Out"
        onPress={() => {
          logout();
        }}
      /> */
  }
  // </View>
  // );
};

export default AuthenticatedStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
