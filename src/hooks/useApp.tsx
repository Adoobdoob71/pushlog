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
      database: "ten22",
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
    console.log(templatesData);
    if (templatesData.length === 0) {
      const muscleCategory1 = dbConnector.manager.create(MuscleCategory, {
        id: 2,
        name: "chest",
      });
      const muscleCategory2 = dbConnector.manager.create(MuscleCategory, {
        id: 3,
        name: "triceps",
      });
      const muscleCategory3 = dbConnector.manager.create(MuscleCategory, {
        id: 4,
        name: "front delts",
      });
      const exercise = dbConnector.manager.create(Exercise, {
        name: "Bench Press",
        exerciseNumber: 192,
        muscleCategories: [muscleCategory1, muscleCategory2, muscleCategory3],
        image: "https://wger.de/media/exercise-images/192/Bench-press-1.png",
      });
      await addTemplate({
        name: "Turtle Back",
        description: "Lats babyyyyyyy",
        exercises: [exercise],
        muscleCategories: [muscleCategory1, muscleCategory2, muscleCategory3],
      });
    }
  };

  const addTemplate = async (newTemplate: WorkoutTemplate) => {
    try {
      const temp = dbConnector.manager.create(Workout, newTemplate);
      await dbConnector.manager.save(Workout, temp);
      setTemplates((templates) => [...templates, temp]);
      Toast.show({
        type: "success",
        text1: "Amazing!",
        text2: "Added the new workout template 🎉",
      });
      return temp;
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
      await dbConnector.manager.update(
        Workout,
        modifiedTemplate.id,
        modifiedTemplate
      );
      let newTemplateArr = templates;
      const index = newTemplateArr.findIndex(
        (template) => template?.id === modifiedTemplate.id
      );
      newTemplateArr[index] = modifiedTemplate;
      setTemplates(newTemplateArr);
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
    dbConnector,
  };
}

export { useApp };
