import { createContext } from "react";

export default createContext<{
  musclesTargeted: number[];
  changeProgram: (programArr: number[]) => void;
}>({
  musclesTargeted: [],
  changeProgram: async (programArr: number[]) => {},
});
