import {Route} from "react-router-dom";
import {Layout} from "../components/Layout/Layout";
import {WelcomePage} from "../pages/WelcomePage/WelcomePage";

export const AppRouter = () => {
    return (
        <Route>
            <Route path="/welcome" element={<WelcomePage/>}/>
            <Route path="/" element={<Layout/>}>
                <Route path="calendar" />
                <Route path="posts" />
                <Route path="events" />
                <Route path="calculator" />
                <Route path="stores" />
            </Route>
        </Route>
    )
}