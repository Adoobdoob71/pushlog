import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { DateData } from "react-native-calendars";
import BottomSheet from "@gorhom/bottom-sheet";
import { WorkoutTemplate } from "utils/types";
import Toast from "react-native-toast-message";
import sqliteDB from "context/sqliteDB";
import { Exercise } from "database/schemas";
import workoutTemplates from "context/workoutTemplates";

function useHome() {
  const [activeTemplates, setActiveTemplates] = useState<WorkoutTemplate[]>([]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%", "85%"], []);

  const { connector } = useContext(sqliteDB);
  const { addTemplate } = useContext(workoutTemplates);

  const handlePresentModalPress = () => {
    // const muscleCategory1 = {
    //   muscleId: 5,
    //   name: "lats",
    // };
    // const muscleCategory2 = {
    //   muscleId: 6,
    //   name: "biceps",
    // };
    // const muscleCategory3 = {
    //   muscleId: 7,
    //   name: "rear-delts",
    // };
    // const exercise = connector?.manager.create(Exercise, {
    //   name: "Bent Over Barbell Row",
    //   exerciseNumber: 412,
    //   muscleCategories: [muscleCategory1, muscleCategory2, muscleCategory3],
    //   image: "https://wger.de/media/exercise-images/192/Bench-press-1.png",
    // });
    // const exercise2 = connector?.manager.create(Exercise, {
    //   name: "Chin Ups",
    //   exerciseNumber: 181,
    //   muscleCategories: [muscleCategory1, muscleCategory2, muscleCategory3],
    //   image: "https://wger.de/media/exercise-images/181/Chin-ups-2.png",
    // });
    // const exercise3 = connector?.manager.create(Exercise, {
    //   name: "Muscle Up",
    //   exerciseNumber: 626,
    //   muscleCategories: [muscleCategory1, muscleCategory2, muscleCategory3],
    //   image: "https://wger.de/media/exercise-images/192/Bench-press-1.png",
    // });
    // addTemplate({
    //   name: "Swing dem wings",
    //   description: "Grow a big back with biceps along the way",
    //   exercises: [exercise, exercise2, exercise3],
    //   muscleCategories: [muscleCategory1, muscleCategory2, muscleCategory3],
    // });
    bottomSheetRef.current?.snapToIndex(0);
  };

  const date = new Date();
  const currentDay = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    dateString: date.toLocaleString(),
    timestamp: date.getMilliseconds(),
  };
  const [chosenDay, setChosenDay] = useState<DateData>(currentDay);

  const updateChosenDay = (day: DateData) => setChosenDay(day);

  const removeActiveTemplates = (templateId: string) => {
    try {
      const exists = activeTemplates.some((item) => item.id === templateId);
      if (!exists) return;
      setActiveTemplates(
        activeTemplates.filter((item) => item.id !== templateId)
      );
      Toast.show({
        type: "success",
        text1: "Great!",
        text2: "Updated workout 💪",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
    }
  };

  const addActiveTemplates = (newTemplate: WorkoutTemplate) => {
    try {
      const exists = activeTemplates.some((item) => item.id === newTemplate.id);
      if (exists) return;
      setActiveTemplates((activeTemplates) => [
        ...activeTemplates,
        newTemplate,
      ]);
      Toast.show({
        type: "success",
        text1: "Great!",
        text2: "Updated workout 💪",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
    }
  };

  return {
    activeTemplates,
    currentDay,
    chosenDay,
    updateChosenDay,
    bottomSheetRef,
    snapPoints,
    handlePresentModalPress,
    addActiveTemplates,
    removeActiveTemplates,
  };
}

export { useHome };
