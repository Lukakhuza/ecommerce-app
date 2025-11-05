import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileSettings from "../screens/AuthenticatedScreens/Profile/ProfileSettings";
import ManageUserAddress from "../screens/AuthenticatedScreens/Profile/ManageUserAddress";
import ManageUserData from "../screens/AuthenticatedScreens/Profile/ManageUserData";
import Categories from "../screens/AuthenticatedScreens/Categories";
import Welcome from "../screens/AuthenticatedScreens/Home/Welcome";
import IconButton from "../components/atoms/IconButton";
import HomePage from "../screens/AuthenticatedScreens/Home/Home";

const Stack = createNativeStackNavigator();

const ProfileTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileSettings}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="ManageUserData"
        component={ManageUserData}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="ManageUserAddress"
        component={ManageUserAddress}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileTab;
