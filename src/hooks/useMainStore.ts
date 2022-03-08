import { createContext, useContext } from "react"
import { MainStore } from "../store"

const mainStore = new MainStore();
const MainStoreContext = createContext(mainStore);

export const useMainStore = (): MainStore => useContext(MainStoreContext);
