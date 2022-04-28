import { observer } from "mobx-react-lite";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../Loginpage";
import { RedirectPage } from "../RedirectPage";
import { RegisterPage } from "../RegisterPage";

export const RoutesPage = observer(() => {
  return (
    <Routes>
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/register"} element={<RegisterPage />} />
      <Route path={"/"} element={<RedirectPage />} />
    </Routes>
  );
});
