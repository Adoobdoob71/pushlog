import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { DateData } from "react-native-calendars";
import { WorkoutTemplate } from "utils/types";
import Toast from "react-native-toast-message";
import workoutTemplates from "context/workoutTemplates";
import { Modalize } from "react-native-modalize";

function useHome() {
  const { templates } = useContext(workoutTemplates);

  const [activeTemplates, setActiveTemplates] = useState<WorkoutTemplate[]>([]);
  const [templateSearchQuery, setTemplateSearachQuery] = useState<
    string | null
  >(null);
  const [templatesToShow, setTemplatesToShow] =
    useState<WorkoutTemplate[]>(templates);

  const onSearchQueryChange = (value: string) => setTemplateSearachQuery(value);

  useEffect(() => {
    if (templateSearchQuery !== null) {
      const time = setTimeout(() => {
        queryTemplates();
      }, 250);
      return () => clearTimeout(time);
    }
  }, [templateSearchQuery]);

  useEffect(() => {
    setTemplatesToShow(templates);
  }, [templates]);

  const queryTemplates = () => {
    const qryTemplates = templates.filter((template) =>
      template.name
        .toLowerCase()
        .includes(templateSearchQuery.toLocaleLowerCase())
    );
    setTemplatesToShow(qryTemplates);
  };

  const modalizeRef = useRef<Modalize>(null);

  const snapPoints = useMemo(() => ["50%", "85%"], []);

  const handlePresentModalPress = () => {
    modalizeRef.current?.open();
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

  useEffect(() => {
    activeTemplates.forEach((item) => {
      const exists = templates.some((tem) => tem.id === item.id);
      if (!exists) removeActiveTemplates(item.id);
    });
  }, [templates]);

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
    templatesToShow,
    currentDay,
    chosenDay,
    updateChosenDay,
    modalizeRef,
    snapPoints,
    handlePresentModalPress,
    addActiveTemplates,
    removeActiveTemplates,
    templateSearchQuery,
    onSearchQueryChange,
  };
}

export { useHome };
