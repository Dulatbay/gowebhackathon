import 'bootstrap/dist/css/bootstrap.min.css';
import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import Store from "./store/store";
import './reset.css'
const store = new Store()

export const Context = createContext({
    store
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Context.Provider value={{store}}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Context.Provider>
)
;


