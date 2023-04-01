import {Route, Routes} from "react-router-dom";
import {HomePageLayout} from "../pages/HomePageLayout/HomePageLayout";
import {WelcomePage} from "../pages/WelcomePage/WelcomePage";
import {AuthPage} from "../pages/AuthPage/AuthPage";
import Main from "../components/Main/Main";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/welcome" element={<WelcomePage/>}/>
            <Route path="/" element={<HomePageLayout/>}>
                <Route exact path={'/'} element={<Main />} />
            </Route>
        </Routes>
    )
}