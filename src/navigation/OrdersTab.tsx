import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IconButton from '../components/atoms/IconButton';
import OrderDetails from '../screens/protected/OrderDetails';
import OrderItems from '../screens/protected/OrderItems';
import Orders from '../screens/protected/Orders';
import { OrdersTabParamList } from '../types/navigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<OrdersTabParamList>();

type OrderDetailsProps = NativeStackScreenProps<
  OrdersTabParamList,
  'OrderDetails'
>;

type OrderItemsProps = NativeStackScreenProps<OrdersTabParamList, 'OrderItems'>;
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
        options={({ navigation: { goBack }, route }: OrderDetailsProps) => ({
          title: route.params?.orderData?._id
            ? `Order ${route.params.orderData._id.slice(-10)}`
            : 'Order Details',
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
        options={({ navigation: { goBack }, route }: OrderItemsProps) => ({
          title: 'Order Items',
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
