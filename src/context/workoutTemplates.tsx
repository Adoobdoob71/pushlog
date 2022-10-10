import { createContext } from "react";
import { WorkoutTemplate } from "utils/types";

export default createContext<{
  templates: (WorkoutTemplate | null)[];
  addTemplate: (newTemplate: WorkoutTemplate) => Promise<void>;
  removeTemplate: (templateId: string) => Promise<void>;
  modifyTemplate: (modifiedTemplate: WorkoutTemplate) => Promise<void>;
  loadingTemplates: boolean;
}>({
  templates: [],
  addTemplate: async (newTemplate: WorkoutTemplate) => {},
  removeTemplate: async (templateId: string) => {},
  modifyTemplate: async (modifiedTemplate: WorkoutTemplate) => {},
  loadingTemplates: true,
});
