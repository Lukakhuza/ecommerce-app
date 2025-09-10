import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileSettings from "../screens/AuthenticatedScreens/Settings/ProfileSettings";
import ManageUserAddress from "../screens/AuthenticatedScreens/Settings/ManageUserAddress";
import ManageUserData from "../screens/AuthenticatedScreens/Settings/ManageUserData";
import Categories from "../screens/AuthenticatedScreens/Categories";
import Welcome from "../screens/AuthenticatedScreens/Welcome";
import IconButton from "../components/atoms/IconButton";
import HomePage from "../screens/AuthenticatedScreens/Home";

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
