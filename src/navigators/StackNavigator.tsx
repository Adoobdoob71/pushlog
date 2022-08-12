import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "screens/Home";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen component={Home} name="Home" />
    </Stack.Navigator>
  );
};

export default StackNavigator;
