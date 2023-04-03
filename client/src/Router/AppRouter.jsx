import {Route, Routes, useNavigate} from "react-router-dom";
import {HomePageLayout} from "../pages/HomePageLayout/HomePageLayout";
import {WelcomePage} from "../pages/WelcomePage/WelcomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import {AuthPage} from "../pages/AuthPage/AuthPage";
import Main from "../components/Main/Main";
import {Events} from "../components/Events/Events";
import {Histories} from "../components/Histories/Histories";
import {Blogs} from "../components/Blogs/Blogs";
import Shop from "../components/Shop/Shop";
import {Recipes} from "../components/Recipes/Recipes";
import EventCard from "../components/EventCard/EventCard";
import {About} from "../components/About/About";
import {Context} from "../index";
import {useContext, useEffect, useState} from "react";
import {Loader} from "../components/Loader/Loader";
import {EventsCreate} from "../components/EventsCreate/EventsCreate";
import {UserProfile} from "../components/UserProfile/UserProfile";
import {BlogCreate} from "../components/BlogsCreate/BlogCreate";

export const AppRouter = () => {
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
    if (isLoading) return <Loader/>
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/welcome" element={<WelcomePage/>}/>
            <Route path="/" element={<HomePageLayout/>}>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/events/calendar'} element={<Events/>}/>
                <Route path={'/events/create'} element={<EventsCreate/>}/>
                <Route path={'/events/:id'} element={<EventCard/>}/>
                <Route path={'/histories'} element={<Histories/>}/>
                <Route path={'/blogs'} element={<Blogs/>}/>
                <Route path={'/blogs/create'} element={<BlogCreate/>}/>
                <Route path={'/store'} element={<Shop/>}/>
                <Route path={'/recipes'} element={<Recipes/>}/>
                <Route path={'/about'} element={<About/>}/>
                <Route path={'/profile'} element={<UserProfile/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}