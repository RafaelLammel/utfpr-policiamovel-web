import React from 'react';
import LoginPage from '../pages/Login';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;