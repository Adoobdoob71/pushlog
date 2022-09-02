import { useNavigation } from "@react-navigation/native";
import workoutRoutine from "context/workoutTemplates";
import { useContext } from "react";
import { WorkoutTemplate } from "utils/types";

function useWorkoutPlan() {
  const {} = useContext(workoutRoutine);

  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  const submitChanges = () => {
    // changeRoutine(newRoutine);
    goBack();
  };

  return {
    goBack,
    submitChanges,
  };
}

export { useWorkoutPlan };
