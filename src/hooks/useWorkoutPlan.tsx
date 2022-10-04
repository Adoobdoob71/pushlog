import { useNavigation } from "@react-navigation/native";
import workoutTemplates from "context/workoutTemplates";
import { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

function useWorkoutPlan() {
  const [templatesForRemoval, setTemplatesForRemoval] = useState<string[]>([]);

  const { removeTemplate } = useContext(workoutTemplates);

  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  const submitChanges = () => {
    goBack();
  };

  const addTemplateForRemoval = (templateId: string) => {
    setTemplatesForRemoval((removalTemplates) => [
      ...removalTemplates,
      templateId,
    ]);
  };

  const removeTemplateForRemoval = (templateId: string) => {
    setTemplatesForRemoval((removalTemplates) =>
      removalTemplates.filter((tem) => tem !== templateId)
    );
  };

  const toggleTemplateForRemoval = (templateId: string) => {
    if (templatesForRemoval.some((tem) => tem === templateId))
      removeTemplateForRemoval(templateId);
    else addTemplateForRemoval(templateId);
  };

  const deleteTemplates = async () => {
    try {
      await Promise.all(
        templatesForRemoval.map(async (item) => await removeTemplate(item))
      );
      templatesForRemoval.map((item) => removeTemplateForRemoval(item));
      Toast.show({
        type: "success",
        text1: "Great!",
        text2: "Deleted successfully 💪",
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
    goBack,
    submitChanges,
    templatesForRemoval,
    toggleTemplateForRemoval,
    deleteTemplates,
  };
}

export { useWorkoutPlan };
