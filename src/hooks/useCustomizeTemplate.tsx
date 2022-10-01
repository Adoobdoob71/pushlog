import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Exercise, MuscleCategory, WorkoutTemplate } from "utils/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import workoutTemplates from "context/workoutTemplates";
import { getExercises } from "api/functions";

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
  const [exercisesToAdd, setExercisesToAdd] = useState<Exercise[]>([]);
  const [exercisesQueryData, setExercisesQueryData] = useState<Exercise[]>([]);
  const [exerciseSearch, setExerciseSearch] = useState("");

  const { templates } = useContext(workoutTemplates);

  const goBack = () => navigation.goBack();

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
    getExercises(exerciseSearch);
  }, [exerciseSearch]);

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
    exercisesToAdd,
    exercisesQueryData,
    exerciseSearch,
    changeExerciseQuery,
  };
}

export { useCustomizeTemplate };
