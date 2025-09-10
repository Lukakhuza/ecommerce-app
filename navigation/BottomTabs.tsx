import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Notifications from "../screens/AuthenticatedScreens/Notifications";
import Orders from "../screens/AuthenticatedScreens/Orders";
import ProfileSettings from "../screens/AuthenticatedScreens/Settings/ProfileSettings";
import HomePage from "../screens/AuthenticatedScreens/Home";
import ProfileTab from "./ProfileTab";
import HomeTab from "./HomeTab";

const BottomTabs = createBottomTabNavigator();

const TabsOverview = () => {
  return (
    <BottomTabs.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabs.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          title: "Home",
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
        name="ProfileTab"
        component={ProfileTab}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={25} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default TabsOverview;
