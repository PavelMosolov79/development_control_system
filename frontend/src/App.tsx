import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import Authorization from "./pages/Authorization";

// import Home from './Home';
// import About from './About';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Authorization />} />
            </Routes>
        </BrowserRouter>
    );
}
export default observer(App);
