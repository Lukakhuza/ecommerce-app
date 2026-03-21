import Icon from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeTab from './HomeTab';
import OrdersTab from './OrdersTab';
import Notifications from '../screens/protected/Notifications';
import ProfileTab from './ProfileTab';

const BottomTabs = createBottomTabNavigator();

const TabsOverview = () => {
  return (
    <BottomTabs.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabs.Screen
        name="HomeTab"
        component={HomeTab}
        options={({ route }: any) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Orders';
          const hideOnScreens = ['Cart', 'Checkout', 'ManageShippingAddress'];
          if (hideOnScreens.includes(routeName)) {
            return {
              headerShown: false,
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" size={25} color={color} />
              ),
              tabBarStyle: { display: 'none' },
              tabBarVisible: false,
            };
          }
          return {
            headerShown: false,
            title: 'Home',
            contentStyle: { backgroundColor: '#fff' },
            animation: 'none',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={25} color={color} />
            ),
            tabBarStyle: { display: 'flex' },
          };
        }}
      />
      <BottomTabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="notifications-outline" size={25} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="OrdersTab"
        component={OrdersTab}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Orders';
          const hideOnScreens = ['OrderDetails', 'OrderItems'];

          if (hideOnScreens.includes(routeName)) {
            return {
              title: 'Orders',
              contentStyle: { backgroundColor: '#fff' },
              animation: 'none',
              tabBarIcon: ({ color, size }) => (
                <Icon name="receipt-outline" size={25} color={color} />
              ),
              tabBarStyle: { display: 'none' },
            };
          }
          return {
            title: 'Orders',
            contentStyle: { backgroundColor: '#fff' },
            animation: 'none',
            tabBarIcon: ({ color, size }) => (
              <Icon name="receipt-outline" size={25} color={color} />
            ),
            tabBarStyle: { display: 'flex' },
          };
        }}
      />
      <BottomTabs.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={25} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default TabsOverview;
