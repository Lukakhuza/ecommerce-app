import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import { AppParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<AppParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        animation: 'none',
      }}
    >
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
          animation: 'none',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
