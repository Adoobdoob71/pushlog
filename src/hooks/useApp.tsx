import { useContext, useEffect, useState } from "react";
import { theme } from "utils/styles";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WorkoutTemplate } from "utils/types";
import Toast from "react-native-toast-message";
import Realm from "realm";
import { Exercise, MuscleCategory, Workout } from "src/database/schemas";
import realmDB from "context/realmDB";

function useApp() {
  const [templates, setTemplates] = useState<Map<
    string,
    WorkoutTemplate
  > | null>(null);

  NavigationBar.setBackgroundColorAsync(theme.colors.background);

  const [loaded] = useFonts({
    orbitronBlack: require("../../assets/fonts/Orbitron-Black.ttf"),
    orbitronBold: require("../../assets/fonts/Orbitron-Bold.ttf"),
    orbitronExtraBold: require("../../assets/fonts/Orbitron-ExtraBold.ttf"),
    orbitronMedium: require("../../assets/fonts/Orbitron-Medium.ttf"),
    orbitronRegular: require("../../assets/fonts/Orbitron-Regular.ttf"),
    orbitronSemiBold: require("../../assets/fonts/Orbitron-SemiBold.ttf"),
  });

  const realmdb = useContext(realmDB);

  const openRealm = async () => {
    try {
      const realm = await Realm.open({
        schema: [Workout, Exercise, MuscleCategory],
      });
      realmdb.DB = realm;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Uh oh...",
        text2: "Something went wrong 😥",
      });
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("@workoutTemplates").then((data) => {
      data && setTemplates(JSON.parse(data));
    });
    openRealm();
    return () => {
      realmdb.DB.close();
    };
  }, []);

  const addTemplate = async (newTemplate: WorkoutTemplate) => {
    try {
      const newTemplateMap = templates;
      newTemplateMap.set(newTemplate.id, newTemplate);
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
    realmdb,
  };
}

export { useApp };
