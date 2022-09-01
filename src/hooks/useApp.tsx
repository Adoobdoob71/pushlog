import { useEffect, useState } from "react";
import { theme } from "utils/styles";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WorkoutRoutine } from "utils/types";

function useApp() {
  const [routine, setRoutine] = useState<WorkoutRoutine | null>(null);

  NavigationBar.setBackgroundColorAsync(theme.colors.background);
  const [loaded] = useFonts({
    orbitronBlack: require("../../assets/fonts/Orbitron-Black.ttf"),
    orbitronBold: require("../../assets/fonts/Orbitron-Bold.ttf"),
    orbitronExtraBold: require("../../assets/fonts/Orbitron-ExtraBold.ttf"),
    orbitronMedium: require("../../assets/fonts/Orbitron-Medium.ttf"),
    orbitronRegular: require("../../assets/fonts/Orbitron-Regular.ttf"),
    orbitronSemiBold: require("../../assets/fonts/Orbitron-SemiBold.ttf"),
  });

  useEffect(() => {
    AsyncStorage.getItem("@workoutRoutine").then((data) => {
      data && setRoutine(JSON.parse(data));
    });
  }, []);

  const changeRoutine = async (newRoutine: WorkoutRoutine) => {
    const jsonArr = JSON.stringify(newRoutine);
    await AsyncStorage.setItem("@workoutRoutine", jsonArr);
    setRoutine(newRoutine);
  };

  return {
    routine,
    changeRoutine,
    loaded,
  };
}

export { useApp };
