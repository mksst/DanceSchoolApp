//Core
import React, { VFC } from "react";
import { observer } from "mobx-react-lite";

//Router
import { Navigate } from "react-router";

//Hooks
import { useMainStore } from "../../hooks/useMainStore";

export const RedirectPage: VFC = observer(() => {

    const { getToken } = useMainStore();
    const token = getToken();

    if (token) return <Navigate to={"/main"} />
    return <Navigate to={"/login"} />
})