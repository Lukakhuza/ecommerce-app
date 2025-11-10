import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsOverview from "./BottomTab";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName="TabsOverview">
      <Stack.Screen
        name="TabsOverview"
        component={TabsOverview}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
          animation: "none",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
