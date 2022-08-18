import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Configuration from "screens/Configuration";
import Home from "screens/Home";
import Settings from "screens/Settings";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ header: () => null, animation: "slide_from_bottom" }}
    >
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Settings} name="Settings" />
      <Stack.Screen component={Configuration} name="Configuration" />
    </Stack.Navigator>
  );
};

export default StackNavigator;
