import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "screens/Home"
import Settings from "screens/Settings"
import TemplatesList from "screens/TemplatesList"
import CustomizeTemplate from "screens/CustomizeTemplate"
import { RootStackParamList } from "utils/types"
import ExerciseInfo from "screens/ExerciseInfo"

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ header: () => null, animation: "slide_from_bottom" }}>
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Settings} name="Settings" />
      <Stack.Screen component={TemplatesList} name="TemplatesList" />
      <Stack.Screen component={CustomizeTemplate} name="CustomizeTemplate" />
      <Stack.Screen component={ExerciseInfo} name="ExerciseInfo" />
    </Stack.Navigator>
  )
}

export default StackNavigator
