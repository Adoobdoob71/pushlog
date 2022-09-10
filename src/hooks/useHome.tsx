import { useCallback, useMemo, useRef, useState } from "react";
import { DateData } from "react-native-calendars";
import BottomSheet from "@gorhom/bottom-sheet";

function useHome() {
  const [activeTemplates, setActiveTemplates] = useState([]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%", "85%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const addTemplate = () => {};

  const removeTemplate = () => {};

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

  return {
    currentDay,
    chosenDay,
    updateChosenDay,
    activeTemplates,
    addTemplate,
    removeTemplate,
    bottomSheetRef,
    snapPoints,
    handlePresentModalPress,
  };
}

export { useHome };
