//Core
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { observer } from "mobx-react-lite";
import React, { VFC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { RoutesPage } from "./pages/RoutesPage";

export const App: VFC = observer(() => {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RoutesPage />
        </LocalizationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
});
