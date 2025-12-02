import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Notifications from "../screens/AuthenticatedScreens/Notifications/Notifications";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProfileTab from "./ProfileTab";
import OrdersTab from "./OrdersTab";
import HomeTab from "./HomeTab";

const BottomTabs = createBottomTabNavigator();

const TabsOverview = () => {
  return (
    <BottomTabs.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabs.Screen
        name="HomeTab"
        component={HomeTab}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Orders";
          const hideOnScreens = ["Cart", "Checkout", "ManageShippingAddress"];

          if (hideOnScreens.includes(routeName)) {
            return {
              headerShown: false,
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={25} color={color} />
              ),

              tabBarStyle: { display: "none" },
              tabBarVisible: false,
            };
          }
          return {
            headerShown: false,
            title: "Home",
            contentStyle: { backgroundColor: "#fff" },
            animation: "none",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={25} color={color} />
            ),
            tabBarStyle: { display: "flex" },
          };
        }}
      />
      <BottomTabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="OrdersTab"
        component={OrdersTab}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Orders";
          const hideOnScreens = ["OrderDetails", "OrderItems"];

          if (hideOnScreens.includes(routeName)) {
            return {
              title: "Orders",
              contentStyle: { backgroundColor: "#fff" },
              animation: "none",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="receipt-outline" size={25} color={color} />
              ),
              tabBarStyle: { display: "none" },
            };
          }
          return {
            title: "Orders",
            contentStyle: { backgroundColor: "#fff" },
            animation: "none",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="receipt-outline" size={25} color={color} />
            ),
            tabBarStyle: { display: "flex" },
          };
        }}
      />
      <BottomTabs.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          headerShown: false,
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
