import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {AppRouter} from "./Router/AppRouter";


function App() {
    return (
        <AppRouter/>
    );
}

export default App;
