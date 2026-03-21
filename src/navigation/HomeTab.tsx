import Cart from '../screens/protected/Cart';
import Categories from '../screens/protected/Categories';
import IconButton from '../components/atoms/IconButton';
import Checkout from '../screens/protected/Checkout';
import ManagePaymentMethod from '../screens/protected/ManagePaymentMethod';
import ManageShippingAddress from '../screens/protected/ManageShippingAddress';
import Favorites from '../screens/protected/Favorites';
import HomePage from '../screens/protected/Home';
import Payment from '../screens/protected/Payment';
import ProductDetails from '../screens/protected/ProductDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/protected/Welcome';

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
          title: '',
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={({ navigation }) => ({
          title: '',
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
          title: '',
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
          title: '',
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
          title: 'Cart',
          headerShown: true,
          headerTransparent: false,
          headerTitleAlign: 'center',
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
          headerTitle: 'Checkout',
          headerTitleAlign: 'center',
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
          title: '',
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
        name="ManageShippingAddress"
        component={ManageShippingAddress}
        options={({ navigation }) => ({
          title: '',
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
        name="Payment"
        component={Payment}
        options={() => ({
          title: 'Payment Methods',
          headerShown: true,
          headerTransparent: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="ManagePaymentMethod"
        component={ManagePaymentMethod}
        options={({ navigation }) => ({
          title: '',
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
