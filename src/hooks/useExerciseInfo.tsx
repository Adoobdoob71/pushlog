import { useRoute } from "@react-navigation/native";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ExerciseSet } from "utils/types";
import BottomSheet from "@gorhom/bottom-sheet";
import sqliteDB from "context/sqliteDB";
import { Exercise, ExerciseSet as exSet } from "database/schemas";
import Toast from "react-native-toast-message";

function useExerciseInfo() {
  const route = useRoute();
  // @ts-ignore
  const currentExercise: Exercise = route.params.exercise;

  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>([]);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [setNumber, setSetNumber] = useState(1);

  const { connector } = useContext(sqliteDB);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%"], []);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const readExerciseSets = async () => {
    const sets = await connector.manager.findBy(exSet, {
      exerciseNumber: currentExercise.exerciseNumber,
    });
    setExerciseSets(sets);
  };

  useEffect(() => {
    readExerciseSets();
  }, []);

  const onRepsChange = (value: number) => setReps(value);
  const onWeightChange = (value: number) => setWeight(value);
  const onSetNumberChange = (value: number) => setSetNumber(value);

  const addSet = async () => {
    try {
      const newSet = connector.manager.create(exSet, {
        reps: reps,
        weight: weight,
        exerciseNumber: currentExercise.exerciseNumber,
        setNumber,
      });
      connector.manager.save(exSet, newSet);
      setExerciseSets((exerciseSets) => [...exerciseSets, newSet]);
      Toast.show({
        type: "success",
        text1: "Amazing!",
        text2: "New set recorded 🎉",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
      console.error(error);
    }
  };

  return {
    currentExercise,
    exerciseSets,
    readExerciseSets,
    bottomSheetRef,
    snapPoints,
    handlePresentModalPress,
    reps,
    weight,
    onRepsChange,
    onWeightChange,
    setNumber,
    onSetNumberChange,
    addSet,
  };
}

export { useExerciseInfo };
