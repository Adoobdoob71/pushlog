import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "utils/styles";
import StackNavigator from "navigators/StackNavigator";
import { useApp } from "hooks/useApp";
import WorkoutRoutine from "context/workoutTemplates";
import Toast, { BaseToast } from 'react-native-toast-message'

export default function App() {
  const { templates, addTemplate, modifyTemplate, removeTemplate, loaded } = useApp();

  return loaded ? (
<>
<WorkoutRoutine.Provider value={{ templates, addTemplate, modifyTemplate, removeTemplate }}>
      <NavigationContainer theme={theme}>
        <StatusBar
          style="light"
          translucent={false}
          backgroundColor={theme.colors.background}
          animated
        />
        <StackNavigator />
      </NavigationContainer>
    </WorkoutRoutine.Provider>
    <Toast config={{ success: (props) => (
      <BaseToast {...props} style={{ borderLeftColor: theme.colors.primary }} text1Style={{ color: theme.colors.text }} text2Style={{ color: theme.colors.text }} contentContainerStyle={{ backgroundColor: theme.colors.card }}/>
    ),
    error: (props) => (
      <BaseToast {...props} style={{ borderLeftColor: theme.colors.primary }} text1Style={{ color: theme.colors.text }} text2Style={{ color: theme.colors.text }} contentContainerStyle={{ backgroundColor: theme.colors.card }}/>
    )}}/>
</>
  ) : null;
}
