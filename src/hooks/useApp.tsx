import { useEffect, useState } from "react";
import { theme } from "utils/styles";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useApp() {
  const [targetMuscles, setTargetMuscles] = useState<number[]>([]);

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
    AsyncStorage.getItem("targetMuscles").then((data) => {
      data && setTargetMuscles(JSON.parse(data));
    });
  }, []);

  const changeProgram = async (programArr: number[]) => {
    const jsonArr = JSON.stringify(programArr);
    await AsyncStorage.setItem("targetMuscles", jsonArr);
    setTargetMuscles(programArr);
  };

  return {
    targetMuscles,
    changeProgram,
    loaded,
  };
}

export { useApp };
