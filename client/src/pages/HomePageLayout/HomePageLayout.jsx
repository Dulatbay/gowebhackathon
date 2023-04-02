import {Outlet} from "react-router-dom";
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {memo} from "react";

export const HomePageLayout = memo(() => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
})