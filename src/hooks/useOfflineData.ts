import { createContext, useContext } from "react";

import { OfflineStore } from "../offlineMode";

const offlineStore = new OfflineStore();
const OfflineStoreContext = createContext(offlineStore);

export const useOfflineStore = (): OfflineStore =>
  useContext(OfflineStoreContext);
