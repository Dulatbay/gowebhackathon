import {Route, Routes, useNavigate} from "react-router-dom";
import {HomePageLayout} from "../pages/HomePageLayout/HomePageLayout";
import {WelcomePage} from "../pages/WelcomePage/WelcomePage";
import {AuthPage} from "../pages/AuthPage/AuthPage";
import Main from "../components/Main/Main";
import {Events} from "../components/Events/Events";
import {Histories} from "../components/Histories/Histories";
import {Blogs} from "../components/Blogs/Blogs";
import {Store} from "../components/Store/Store";
import {Recipes} from "../components/Recipes/Recipes";
import {About} from "../components/About/About";
import {Context} from "../index";
import {memo, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Loader} from "../components/Loader/Loader";

export const AppRouter = memo(() => {
    const navigate = useNavigate()
    const {store} = useContext(Context)
    const [isLoading, setIsLoading] = useState(0);
    useEffect(() => {
        const checkAuthentication = async () => {
            if (localStorage.getItem('token')) {
                await store.check();
            }
        };
        setIsLoading(1);
        checkAuthentication().then(() => setIsLoading(0));
    }, [])
    if (isLoading) return <Loader />
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/welcome" element={<WelcomePage/>}/>
            <Route path="/" element={<HomePageLayout/>}>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/events'} element={<Events/>}/>
                <Route path={'/histories'} element={<Histories/>}/>
                <Route path={'/blogs'} element={<Blogs/>}/>
                <Route path={'/store'} element={<Store/>}/>
                <Route path={'/recipes'} element={<Recipes/>}/>
                <Route path={'/about'} element={<About/>}/>
            </Route>
        </Routes>
    )
})