import { useNavigation } from "@react-navigation/native";
import workoutRoutine from "context/workoutRoutine";
import { useContext } from "react";
import { WorkoutRoutine } from "utils/types";

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
