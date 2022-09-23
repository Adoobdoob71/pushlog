import { useContext, useEffect, useState } from "react";
import { theme } from "utils/styles";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WorkoutTemplate } from "utils/types";
import Toast from "react-native-toast-message";

function useApp() {
  const [templates, setTemplates] = useState<Map<
    string,
    WorkoutTemplate
  > | null>(new Map<string, WorkoutTemplate>());

  NavigationBar.setBackgroundColorAsync(theme.colors.background);

  const [loaded] = useFonts({
    orbitronBlack: require("../../assets/fonts/Orbitron-Black.ttf"),
    orbitronBold: require("../../assets/fonts/Orbitron-Bold.ttf"),
    orbitronExtraBold: require("../../assets/fonts/Orbitron-ExtraBold.ttf"),
    orbitronMedium: require("../../assets/fonts/Orbitron-Medium.ttf"),
    orbitronRegular: require("../../assets/fonts/Orbitron-Regular.ttf"),
    orbitronSemiBold: require("../../assets/fonts/Orbitron-SemiBold.ttf"),
  });

  useEffect(() => {
    AsyncStorage.getItem("@workoutTemplates").then((data) => {
      data !== null && setTemplates(JSON.parse(data));
    });
    addTemplate({
      name: "Turtle Back",
      description: "Massive lats workout!",
      id: "anotherSomething",
      exercises: [
        {
          id: "1",
          name: "Bench Press",
          image: "https://wger.de/media/exercise-images/192/Bench-press-1.png",
          muscleCategories: [
            { id: "2", name: "chest" },
            { id: "3", name: "triceps" },
            { id: "4", name: "front delts" },
          ],
        },
      ],
      muscleCategories: [
        { id: "5", name: "lats" },
        { id: "6", name: "upper-back" },
        { id: "7", name: "biceps" },
      ],
    });
    addTemplate({
      name: "Getting dem pecs",
      description: "Amazing chest workout!",
      id: "anotherSomethingElseee",
      exercises: [
        {
          id: "1",
          name: "Bench Press",
          image: "https://wger.de/media/exercise-images/192/Bench-press-1.png",
          muscleCategories: [
            { id: "2", name: "chest" },
            { id: "3", name: "triceps" },
            { id: "4", name: "front delts" },
          ],
        },
      ],
      muscleCategories: [
        { id: "2", name: "chest" },
        { id: "3", name: "triceps" },
        { id: "4", name: "front delts" },
      ],
    });
  }, []);

  const addTemplate = async (newTemplate: WorkoutTemplate) => {
    try {
      const newTemplateMap = new Map<string, WorkoutTemplate>();
      newTemplateMap.set(newTemplate.id, newTemplate);
      const jsonMap = JSON.stringify(newTemplateMap);
      await AsyncStorage.setItem("@workoutTemplates", jsonMap);
      Toast.show({
        type: "success",
        text1: "Amazing!",
        text2: "Added the new workout template 🎉",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
      console.error(error);
    }
  };

  const removeTemplate = async (templateId: string) => {
    try {
      const newTemplateMap = templates;
      newTemplateMap.delete(templateId);
      const jsonMap = JSON.stringify(templates);
      await AsyncStorage.setItem("@workoutTemplates", jsonMap);
      setTemplates(newTemplateMap);
      Toast.show({
        type: "success",
        text1: "Amazing!",
        text2: "Added the new workout template 🎉",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
    }
  };

  const modifyTemplate = async (modifiedTemplate: WorkoutTemplate) => {
    try {
      const newTemplateMap = templates;
      newTemplateMap.set(modifiedTemplate.id, modifiedTemplate);
      const jsonMap = JSON.stringify(newTemplateMap);
      await AsyncStorage.setItem("@workoutTemplates", jsonMap);
      setTemplates(newTemplateMap);
      Toast.show({
        type: "success",
        text1: "Amazing!",
        text2: "Added the new workout template 🎉",
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
    addTemplate,
    removeTemplate,
    modifyTemplate,
    loaded,
  };
}

export { useApp };
