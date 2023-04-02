import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {AppRouter} from "./Router/AppRouter";
import {Context} from "./index";

function App() {
    // const {store} = useContext(Context)
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         store.check();
    //     }
    // }, [])
    return (
        <AppRouter/>
    );
}

export default observer(App);
