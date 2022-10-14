import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { DateData } from "react-native-calendars";
import { WorkoutTemplate } from "utils/types";
import Toast from "react-native-toast-message";
import workoutTemplates from "context/workoutTemplates";
import { Modalize } from "react-native-modalize";
import { getMuscles } from "api/functions";

function useHome() {
  const { templates, loadingTemplates } = useContext(workoutTemplates);

  const [activeTemplates, setActiveTemplates] = useState<WorkoutTemplate[]>([]);
  const [templateSearchQuery, setTemplateSearachQuery] = useState<string>("");
  const [muscles, setMuscles] = useState<
    {
      id: number;
      name: string;
      nameEn: string;
      isFront: boolean;
      image: string;
    }[]
  >([]);
  const [activeMuscleFilters, setActiveMuscleFilters] = useState<number[]>([]);
  const [loadingMuscles, setLoadingMuscles] = useState(true);

  const onSearchQueryChange = (value: string) => setTemplateSearachQuery(value);

  const templatesModalRef = useRef<Modalize>(null);
  const filterModalRef = useRef<Modalize>(null);
  const calendarModalRef = useRef<Modalize>(null);

  const openTemplatesModal = () => {
    templatesModalRef.current?.open();
  };

  const openFilterModal = () => {
    filterModalRef.current?.open();
  };

  const openCalendarModal = () => {
    calendarModalRef.current?.open();
  };
  
  const toggleMuscleFilter = (id: number) =>
    setActiveMuscleFilters((activeFilters) => {
      if (activeFilters.some((item) => item === id))
        return activeFilters.filter((item) => item !== id);
      return [...activeFilters, id];
    });

  const date = new Date();
  const currentDay = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    dateString: date.toLocaleDateString(),
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

  useEffect(() => {
    loadMuscles();
  }, []);

  const loadMuscles = async () => {
    try {
      const muscleData = await getMuscles();
      muscleData.results.forEach((item) => {
        setMuscles((musclesArr) => [
          ...musclesArr,
          {
            id: item.id,
            name: item.name,
            nameEn: item.name_en,
            isFront: item.is_front,
            image: item.image_url_main,
          },
        ]);
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
    }
    setLoadingMuscles(false);
  };

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
    templates,
    loadingTemplates,
    activeTemplates,
    currentDay,
    chosenDay,
    updateChosenDay,
    templatesModalRef,
    filterModalRef,
    calendarModalRef,
    openCalendarModal,
    openFilterModal,
    muscles,
    activeMuscleFilters,
    toggleMuscleFilter,
    loadingMuscles,
    openTemplatesModal,
    addActiveTemplates,
    removeActiveTemplates,
    templateSearchQuery,
    onSearchQueryChange,
  };
}

export { useHome };
