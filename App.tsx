import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "utils/styles";
import StackNavigator from "navigators/StackNavigator";
import { useApp } from "hooks/useApp";
import WorkoutRoutine from "context/workoutRoutine";

export default function App() {
  const { changeProgram, targetMuscles, loaded } = useApp();

  return loaded ? (
    <WorkoutRoutine.Provider
      value={{ musclesTargeted: targetMuscles, changeProgram }}
    >
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
  ) : null;
}
