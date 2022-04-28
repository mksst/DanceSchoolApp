import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate } from "react-router-dom";

import { useMainStore } from "../../hooks/useMainStore";
import { MainPage } from "../MainPage";

export const RedirectPage = observer(() => {
  const { token } = useMainStore();

  if (!token) return <Navigate to={"/login"} />;
  return <MainPage />;
});
