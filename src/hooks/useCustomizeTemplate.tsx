import { useContext, useEffect, useRef, useState } from "react";
import { Exercise, MuscleCategory, WorkoutTemplate } from "utils/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import workoutTemplates from "context/workoutTemplates";
import { getAllExercises, getExerciseInfo, getExercises } from "api/functions";
import { WGER_URL } from "api/constants";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";
import { Modalize } from "react-native-modalize";

function useCustomizeTemplate() {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const currentTemplate: WorkoutTemplate | undefined = route.params.template;

  const [workout, setWorkout] = useState<WorkoutTemplate>(
    currentTemplate
      ? currentTemplate
      : { name: "", description: "", exercises: [], muscleCategories: [] }
  );
  const [tags, setTags] = useState<MuscleCategory[]>([]);
  const [exercises, setExercises] = useState([]);
  const [exerciseSearch, setExerciseSearch] = useState("");
  const [exercisesForRemoval, setExercisesForRemoval] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const { templates } = useContext(workoutTemplates);
  const { addTemplate, modifyTemplate } = useContext(workoutTemplates);

  const modalizeRef = useRef<Modalize>(null);

  const goBack = () =>
    Alert.alert("Are you sure?", "Everything will be lost", [
      { text: "Go back", onPress: () => {}, style: "cancel" },
      { text: "delete", onPress: () => navigation.goBack(), style: "default" },
    ]);
  const navigateToExerciseInfo = (exercise: Exercise) =>
    /* @ts-ignore */
    navigation.navigate("ExerciseInfo", { exercise: exercise });

  const handlePresentModalPress = () => {
    modalizeRef.current?.open();
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
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const data = await getAllExercises();
      const exercisesArr = data.results.flatMap((item) =>
        item.language.id === 2
          ? {
              name: item.name,
              description: item.description,
              exerciseNumber: item.id,
              image: item.images[0]?.image,
              muscleCategories: item.muscles[0]
                ? [
                    {
                      name:
                        item.muscles[0].name_en !== ""
                          ? item.muscles[0].name_en
                          : item.muscles[0].name,
                      muscleId: item.muscles[0].id,
                    },
                    ...item.muscles_secondary.map((mc) => {
                      return {
                        name: mc.name_en !== "" ? mc.name_en : mc.name,
                        muscleId: mc.id,
                      };
                    }),
                  ]
                : [],
            }
          : []
      );
      setExercises(exercisesArr);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
      console.error(error);
    }
    setLoading(false);
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
        image: data.images[0]?.image,
        muscleCategories: data.muscles[0]
          ? [
              {
                name:
                  data.muscles[0].name_en !== ""
                    ? data.muscles[0].name_en
                    : data.muscles[0].name,
                muscleId: data.muscles[0].id,
              },
              ...data.muscles_secondary.map((mc) => {
                return {
                  name: mc.name_en !== "" ? mc.name_en : mc.name,
                  muscleId: mc.id,
                };
              }),
            ]
          : [],
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
    try {
      if (currentTemplate === undefined)
        addTemplate({ ...workout, muscleCategories: tags });
      else modifyTemplate({ ...workout, muscleCategories: tags });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tags,
    workout,
    templates,
    exercises,
    goBack,
    handleName,
    handleDescription,
    modalizeRef,
    handlePresentModalPress,
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
    loading,
  };
}

export { useCustomizeTemplate };
