import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "screens/Home";
import Settings from "screens/Settings";
import WorkoutPlan from "screens/WorkoutPlan";
import WorkoutTemplate from "screens/WorkoutTemplate";

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  WorkoutPlan: undefined;
  WorkoutTemplate: { templateName: string; templateId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ header: () => null, animation: "slide_from_bottom" }}
    >
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Settings} name="Settings" />
      <Stack.Screen component={WorkoutPlan} name="WorkoutPlan" />
      <Stack.Screen component={WorkoutTemplate} name="WorkoutTemplate" />
    </Stack.Navigator>
  );
};

export default StackNavigator;
