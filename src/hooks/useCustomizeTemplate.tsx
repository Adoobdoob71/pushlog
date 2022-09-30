import { useContext, useEffect, useState } from "react";
import { MuscleCategory, WorkoutTemplate } from "utils/types";
import { useNavigation, useRoute } from "@react-navigation/native";

import workoutTemplates from "context/workoutTemplates";

function useCustomizeTemplate() {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const currentTemplate: WorkoutTemplate | undefined = route.params.template;

  const [workout, setWorkout] = useState<WorkoutTemplate>(currentTemplate);
  const [tags, setTags] = useState<MuscleCategory[]>([]);

  const { templates } = useContext(workoutTemplates);

  const goBack = () => navigation.goBack();

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

  return {
    tags,
    workout,
    templates,
    currentTemplate,
    goBack,
  };
}

export { useCustomizeTemplate };
