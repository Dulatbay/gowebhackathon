import {Route} from "react-router-dom";
import {HomePageLayout} from "../pages/HomePageLayout/HomePageLayout";
import {WelcomePage} from "../pages/WelcomePage/WelcomePage";
import {AuthPage} from "../pages/AuthPage/AuthPage";

export const AppRouter = () => {
    return (
        <Route>
            <Route path="/welcome" element={<AuthPage />} />
            <Route path="/welcome" element={<WelcomePage/>}/>
            <Route path="/" element={<HomePageLayout/>}>
            </Route>
        </Route>
    )
}