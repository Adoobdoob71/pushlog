import { useContext, useEffect, useState } from "react";
import { theme } from "utils/styles";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import { WorkoutTemplate } from "utils/types";
import Toast from "react-native-toast-message";
import { DataSource } from "typeorm";
import {
  Exercise,
  ExerciseSet,
  MuscleCategory,
  Workout,
} from "database/schemas";

function useApp() {
  const [templates, setTemplates] = useState<(WorkoutTemplate | null)[]>([]);
  const [dbConnector, setDBConnector] = useState<DataSource | null>(null);

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
    const dataSource = new DataSource({
      database: "f",
      driver: require("expo-sqlite"),
      entities: [Workout, Exercise, MuscleCategory, ExerciseSet],
      synchronize: true, // DISABLE WHEN PRODUCTION IS ON!
      type: "expo",
    });
    dataSource.initialize().then((con) => {
      setDBConnector(con);
    });
  }, []);

  useEffect(() => {
    if (dbConnector) readTemplates();
  }, [dbConnector]);

  const readTemplates = async () => {
    const templatesData = await dbConnector.manager.find(Workout);
    setTemplates(templatesData);
  };

  const addTemplate = async (newTemplate: WorkoutTemplate) => {
    try {
      const temp = dbConnector.manager.create(Workout, newTemplate);
      await dbConnector.manager.save(Workout, temp);
      setTemplates((templates) => [...templates, temp]);
      Toast.show({
        type: "success",
        text1: "Amazing!",
        text2: "New workout template 🎉",
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
      dbConnector.manager
        .createQueryBuilder()
        .delete()
        .from(Workout)
        .where("id = :id", { id: templateId })
        .execute();
      setTemplates((templates) =>
        templates.filter((template) => template.id !== templateId)
      );
      Toast.show({
        type: "success",
        text1: "Amazing!",
        text2: "Workout template has been removed 🎉",
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
      await dbConnector.manager.save(Workout, modifiedTemplate);
      let newTemplateArr = templates;
      newTemplateArr = newTemplateArr.filter(
        (item) => item.id !== modifiedTemplate.id
      );
      newTemplateArr.push(modifiedTemplate);
      setTemplates(newTemplateArr);
      Toast.show({
        type: "success",
        text1: "Amazing!",
        text2: "Saved workout changes! 🎉",
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
    templates,
    addTemplate,
    removeTemplate,
    modifyTemplate,
    loaded,
    dbConnector,
  };
}

export { useApp };
