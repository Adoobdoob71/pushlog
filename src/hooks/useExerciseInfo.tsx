import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Exercise, ExerciseSet } from "utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useExerciseInfo() {
  const route = useRoute();
  // @ts-ignore
  const currentExercise: Exercise = route.params.exercise;

  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>([]);

  const readExerciseSets = async () => {
    // const jsonData = await AsyncStorage.get
  };

  return {
    route,
    currentExercise,
  };
}

export { useExerciseInfo };
