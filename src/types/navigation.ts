import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  EnterEmail: undefined;
  EnterPassword: { email: string };
  CreateAccount: undefined;
  ForgotPassword: undefined;
  PasswordReset: undefined;
  TellUsAboutYourself: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
