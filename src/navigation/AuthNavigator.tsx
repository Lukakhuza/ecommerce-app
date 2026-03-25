import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnterEmail from '../screens/public/EnterEmail';
import EnterPassword from '../screens/public/EnterPassword';
import CreateAccount from '../screens/public/CreateAccount';
import ForgotPassword from '../screens/public/ForgotPassword';
import PasswordReset from '../screens/public/PasswordReset';
import TellUsAboutYourself from '../screens/public/TellUsAboutYourself';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="EnterEmail" component={EnterEmail} />
      <Stack.Screen name="EnterPassword" component={EnterPassword} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen
        name="TellUsAboutYourself"
        component={TellUsAboutYourself}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
