import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Categories from "../screens/AuthenticatedScreens/Home/Categories";
import Welcome from "../screens/AuthenticatedScreens/Home/Welcome";
import IconButton from "../components/atoms/IconButton";
import HomePage from "../screens/AuthenticatedScreens/Home/Home";
import ProductDetails from "../screens/AuthenticatedScreens/Home/ProductDetails";
import Cart from "../screens/AuthenticatedScreens/Home/Cart";
import Favorites from "../screens/AuthenticatedScreens/Home/Favorites";
import Checkout from "../screens/AuthenticatedScreens/Home/Checkout";

const Stack = createNativeStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={() => ({
          title: "",
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
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
        name="Welcome"
        component={Welcome}
        options={({ navigation }) => ({
          title: "",
          headerTransparent: true,
          headerShown: false,
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
        name="ProductDetails"
        component={ProductDetails}
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
        name="Cart"
        component={Cart}
        options={({ navigation }) => ({
          title: "Cart",
          headerShown: true,
          headerTransparent: false,
          headerTitleAlign: "center",
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
        name="Checkout"
        component={Checkout}
        options={({ navigation }) => ({
          headerTitle: "Checkout",
          headerTitleAlign: "center",
          headerShown: true,
          headerTransparent: false,
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
        name="Favorites"
        component={Favorites}
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
    </Stack.Navigator>
  );
};

export default HomeTab;
