import { useCallback, useMemo, useRef, useState } from "react";
import { DateData } from "react-native-calendars";
import BottomSheet from "@gorhom/bottom-sheet";
import { WorkoutTemplate } from "utils/types";
import Toast from "react-native-toast-message";

function useHome() {
  const [activeTemplates, setActiveTemplates] = useState<WorkoutTemplate[]>([]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%", "85%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

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

  const updateActiveTemplates = async (newTemplate: WorkoutTemplate) => {
    try {
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
      console.error(error);
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
    updateActiveTemplates,
  };
}

export { useHome };
