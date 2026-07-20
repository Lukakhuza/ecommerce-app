import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import ManageUserAddress from '../screens/protected/ManageUserAddress';
import ManageUserData from '../screens/protected/ManageUserData';
import ProfileSettings from '../screens/protected/ProfileSettings';
import { ProfileTabParamsList } from '../types/navigation';

const Stack = createNativeStackNavigator<ProfileTabParamsList>();

type ProfileProps = NativeStackScreenProps<ProfileTabParamsList, 'Profile'>;

const ProfileTab = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileSettings}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="ManageUserData"
        component={ManageUserData}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="ManageUserAddress"
        component={ManageUserAddress}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

export default ProfileTab;
