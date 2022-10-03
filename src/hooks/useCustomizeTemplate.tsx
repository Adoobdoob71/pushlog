import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Exercise, MuscleCategory, WorkoutTemplate } from "utils/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import workoutTemplates from "context/workoutTemplates";
import { getExerciseInfo, getExercises, getMuscleInfo } from "api/functions";
import { WGER_URL } from "api/constants";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";

function useCustomizeTemplate() {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const currentTemplate: WorkoutTemplate | undefined = route.params.template;

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%", "85%"], []);

  const [workout, setWorkout] = useState<WorkoutTemplate>(
    currentTemplate
      ? currentTemplate
      : { name: "", description: "", exercises: [], muscleCategories: [] }
  );
  const [tags, setTags] = useState<MuscleCategory[]>([]);
  const [exercisesQueryData, setExercisesQueryData] = useState<Exercise[]>([]);
  const [exerciseSearch, setExerciseSearch] = useState("");
  const [exercisesForRemoval, setExercisesForRemoval] = useState<number[]>([]);

  const { templates } = useContext(workoutTemplates);
  const { addTemplate, modifyTemplate } = useContext(workoutTemplates);

  const goBack = () =>
    Alert.alert("Are you sure?", "Everything will be lost", [
      { text: "Go back", onPress: () => {}, style: "cancel" },
      { text: "delete", onPress: () => navigation.goBack(), style: "default" },
    ]);
  const navigateToExerciseInfo = () =>
    /* @ts-ignore */
    navigation.navigate("ExerciseInfo", { params: {} });

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  useEffect(() => {
    const newTags = workout.exercises.reduce(
      (previousValue, currentValue, _index, _array) => {
        const newTagsArr = currentValue.muscleCategories.filter(
          (val) => !previousValue.some((item) => item.muscleId === val.muscleId)
        );
        const nextValue = previousValue.concat(newTagsArr);
        return nextValue;
      },
      [] as MuscleCategory[]
    );
    setTags(newTags);
  }, [workout.exercises]);

  const handleName = (name: string) => {
    setWorkout((workout) => {
      return { ...workout, name: name };
    });
  };

  const handleDescription = (description: string) => {
    setWorkout((workout) => {
      return { ...workout, description: description };
    });
  };

  const changeExerciseQuery = (searchQuery: string) =>
    setExerciseSearch(searchQuery);

  useEffect(() => {
    const searchDelay = setTimeout(() => {
      setExercisesQueryData([]);
      exerciseSearch.length > 0 && loadExercises(exerciseSearch);
    }, 500);
    return () => clearTimeout(searchDelay);
  }, [exerciseSearch]);

  const loadExercises = async (exerciseSearch: string) => {
    try {
      const data = await getExercises(exerciseSearch);
      data.suggestions.forEach((item) => {
        setExercisesQueryData((exercisesQueryData) => [
          ...exercisesQueryData,
          {
            exerciseNumber: item.data.id,
            name: item.data.name,
            image: item.data.image ? WGER_URL.concat(item.data.image) : null,
            muscleCategories: [{ muscleId: 0, name: item.data.category }],
          },
        ]);
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
    }
  };

  const addExercise = async (newExercise: Exercise) => {
    try {
      if (
        workout.exercises.some(
          (ex) => ex.exerciseNumber === newExercise.exerciseNumber
        )
      ) {
        Toast.show({
          type: "error",
          text1: "Uh oh...",
          text2: "Exercise is already in the workout 😥",
        });
        return;
      }
      const data = await getExerciseInfo(newExercise.exerciseNumber);
      const exercise: Exercise = {
        name: data.name,
        description: data.description,
        exerciseNumber: data.id,
        image: newExercise.image,
        muscleCategories: [
          { name: data.muscles[0].name_en, muscleId: data.muscles[0].id },
          ...data.muscles_secondary.map((mc) => {
            return { name: mc.name_en, muscleId: mc.id };
          }),
        ],
      };
      setWorkout((w) => {
        return { ...w, exercises: [...w.exercises, exercise] };
      });
      Toast.show({
        type: "success",
        text1: "Great!",
        text2: "Added exercise successfully 💪",
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
    }
  };

  const addExerciseForRemoval = (exerciseId: number) => {
    setExercisesForRemoval((removalExercises) => [
      ...removalExercises,
      exerciseId,
    ]);
  };

  const removeExerciseForRemoval = (exerciseId: number) => {
    setExercisesForRemoval((removalExercises) =>
      removalExercises.filter((ex) => ex !== exerciseId)
    );
  };

  const toggleExerciseForRemoval = (exerciseId: number) => {
    if (exercisesForRemoval.some((ex) => ex === exerciseId))
      removeExerciseForRemoval(exerciseId);
    else addExerciseForRemoval(exerciseId);
  };

  const deleteExercises = async () => {
    try {
      exercisesForRemoval.map((item) =>
        setWorkout((w) => {
          return {
            ...w,
            exercises: w.exercises.filter((ex) => ex.exerciseNumber !== item),
          };
        })
      );
      setExercisesForRemoval([]);
      Toast.show({
        type: "success",
        text1: "Great!",
        text2: "Deleted successfully 💪",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
    }
  };

  const submitWorkout = () => {
    if (currentTemplate === undefined) addTemplate(workout);
    else modifyTemplate(workout);
    navigation.goBack();
  };

  return {
    tags,
    workout,
    templates,
    goBack,
    handleName,
    handleDescription,
    bottomSheetRef,
    handlePresentModalPress,
    snapPoints,
    exercisesQueryData,
    exerciseSearch,
    changeExerciseQuery,
    addExercise,
    navigateToExerciseInfo,
    exercisesForRemoval,
    addExerciseForRemoval,
    removeExerciseForRemoval,
    toggleExerciseForRemoval,
    deleteExercises,
    submitWorkout,
  };
}

export { useCustomizeTemplate };
