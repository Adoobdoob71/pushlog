import { createContext } from "react";
import { DataSource } from "typeorm";

export default createContext<{ connector: DataSource | null }>({
  connector: null,
});
