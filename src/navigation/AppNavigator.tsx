import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsOverview from './BottomTab';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabsOverview"
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        animation: 'none',
      }}
    >
      <Stack.Screen
        name="TabsOverview"
        component={TabsOverview}
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
