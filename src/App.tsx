//Core
import React from "react"
import { observer } from "mobx-react-lite"

//Router
import { Routes, Route, BrowserRouter } from "react-router-dom"

//Components
import { LoginPage } from "./pages/Loginpage"
import { MainPage } from "./pages/MainPage"
import { RedirectPage } from "./pages/RedirectPage"
import { RegisterPage } from "./pages/RegisterPage"

export const App = observer(() => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/main"} element={<MainPage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/register"} element={<RegisterPage />} />
                <Route path={"/"} element={<RedirectPage />} />
                {/* <Route path={"*"} element={<Navigate to={"/"} />} /> */}
            </Routes>
        </BrowserRouter>
    )
})
