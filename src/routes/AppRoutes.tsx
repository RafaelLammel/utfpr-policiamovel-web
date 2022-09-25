import React from 'react';
import HomePage from '../pages/Home';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const AppRoutes = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
        </Routes>
    </BrowserRouter>
    );
};

export default AppRoutes;