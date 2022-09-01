import { createContext } from "react";
import { WorkoutRoutine } from "utils/types";

export default createContext<{
  routine: WorkoutRoutine | null;
  changeRoutine: (newRoutine: WorkoutRoutine) => void;
}>({
  routine: null,
  changeRoutine: async (newRoutine: WorkoutRoutine) => {},
});
