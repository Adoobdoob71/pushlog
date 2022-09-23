import { createContext } from "react";
import Realm from "realm";

export default createContext<{ DB: Realm | null }>({
  DB: null,
});
