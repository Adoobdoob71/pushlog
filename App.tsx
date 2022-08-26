import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "utils/styles";
import StackNavigator from "navigators/StackNavigator";
import targetMuscles from "context/targetMuscles";
import { useApp } from "hooks/useApp";
import TargetMuscles from "context/targetMuscles";

export default function App() {
  const { changeProgram, targetMuscles, loaded } = useApp();

  return loaded ? (
    <TargetMuscles.Provider
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
    </TargetMuscles.Provider>
  ) : null;
}
