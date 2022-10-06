import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Exercise, ExerciseSet } from "utils/types";

function useExerciseInfo() {
  const route = useRoute();
  // @ts-ignore
  const currentExercise: Exercise = route.params.exercise;

  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>([]);
  const [readMore, setReadMore] = useState(false);

  const readExerciseSets = async () => {
    // const jsonData = await AsyncStorage.get
  };

  return {
    currentExercise,
    exerciseSets,
    readExerciseSets,
    readMore,
  };
}

export { useExerciseInfo };
