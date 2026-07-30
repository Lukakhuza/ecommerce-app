import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from './product';
import { OrderData } from './order';

export type AppParamList = {
  BottomTabs: undefined;
};

export type AuthStackParamList = {
  EnterEmail: undefined;
  EnterPassword: { email: string };
  CreateAccount: undefined;
  ForgotPassword: undefined;
  PasswordReset: undefined;
  TellUsAboutYourself: undefined;
};

export type BottomTabsParamList = {
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  Notifications: undefined;
  OrdersTab: NavigatorScreenParams<OrdersTabParamList>;
  ProfileTab: NavigatorScreenParams<ProfileTabParamsList>;
};

export type HomeTabParamList = {
  Home: undefined;
  Categories: undefined;
  Welcome: undefined;
  ProductDetails: { product: Product };
  Cart: undefined;
  Checkout: undefined;
  Favorites: undefined;
  ManageShippingAddress: undefined;
  Payment: undefined;
  ManagePaymentMethod: undefined;
};

export type OrdersTabParamList = {
  Orders: undefined;
  OrderDetails: {
    orderData: OrderData;
  };
  OrderItems: { orderData: OrderData };
};

export type ProfileTabParamsList = {
  Profile: undefined;
  ManageUserData: undefined;
  ManageUserAddress: undefined;
};

export type NotificationsTabParamList = {
  Notifications: undefined;
};

export type HomeTabNavigationProp = NativeStackNavigationProp<HomeTabParamList>;
