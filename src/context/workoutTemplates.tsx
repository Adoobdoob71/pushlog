import { createContext } from "react";
import { WorkoutTemplate } from "utils/types";

export default createContext<{
  templates: Map<string, WorkoutTemplate> | null;
  addTemplate: (newTemplate: WorkoutTemplate) => void;
  removeTemplate: (templateId: string) => void;
  modifyTemplate: (modifiedTemplate: WorkoutTemplate) => void;
}>({
  templates: null,
  addTemplate: async (newTemplate: WorkoutTemplate) => {},
  removeTemplate: async (templateId: string) => {},
  modifyTemplate: async (modifiedTemplate: WorkoutTemplate) => {}
});
