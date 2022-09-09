import { useState } from "react";
import { DateData } from "react-native-calendars";

function useHome() {
  const [activeTemplates, setActiveTemplates] = useState([]);

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
  };
}

export { useHome };
