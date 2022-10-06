import { useNavigation } from "@react-navigation/native";
import workoutTemplates from "context/workoutTemplates";
import { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { WorkoutTemplate } from "utils/types";

function useWorkoutPlan() {
  const { templates, removeTemplate } = useContext(workoutTemplates);

  const [templatesForRemoval, setTemplatesForRemoval] = useState<string[]>([]);
  const [templateSearchQuery, setTemplateSearachQuery] = useState<
    string | null
  >(null);
  const [templatesToShow, setTemplatesToShow] =
    useState<WorkoutTemplate[]>(templates);

  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  const onSearchQueryChange = (value: string) => setTemplateSearachQuery(value);

  const submitChanges = () => goBack();

  useEffect(() => {
    if (templateSearchQuery !== null) {
      const time = setTimeout(() => {
        queryTemplates();
      }, 500);
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
    templatesToShow,
    goBack,
    submitChanges,
    templatesForRemoval,
    toggleTemplateForRemoval,
    deleteTemplates,
    templateSearchQuery,
    onSearchQueryChange,
  };
}

export { useWorkoutPlan };
