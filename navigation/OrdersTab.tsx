import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Orders from "../screens/AuthenticatedScreens/Orders/Orders";
import OrderDetails from "../screens/AuthenticatedScreens/Orders/OrderDetails";
import IconButton from "../components/atoms/IconButton";
import OrderItems from "../screens/AuthenticatedScreens/Orders/OrderItems";

const Stack = createNativeStackNavigator();

const OrdersTab = () => {
  return (
    <Stack.Navigator initialRouteName="Orders">
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={({ navigation: { goBack }, route }: any) => ({
          title: route.params?.orderData?.item?._id
            ? `Order ${route.params.orderData.item._id.slice(-10)}`
            : "Order Details",
          headerShown: true,
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="chevron-back-circle-outline"
              size={32}
              color={tintColor}
              onPress={goBack}
            />
          ),
        })}
      />
      <Stack.Screen
        name="OrderItems"
        component={OrderItems}
        options={({ navigation: { goBack }, route }) => ({
          title: "Order Items",
          headerShown: true,
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="chevron-back-circle-outline"
              size={32}
              color={tintColor}
              onPress={goBack}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default OrdersTab;
