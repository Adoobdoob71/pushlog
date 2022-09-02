import { useNavigation } from "@react-navigation/native";
import workoutTemplates from "context/workoutTemplates";
import { useContext } from "react";
import { WorkoutTemplate } from "utils/types";

function useWorkoutPlan() {
  const { templates, addTemplate, modifyTemplate, removeTemplate } =
    useContext(workoutTemplates);

  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  const submitChanges = () => {
    goBack();
  };

  return {
    goBack,
    submitChanges,
  };
}

export { useWorkoutPlan };
