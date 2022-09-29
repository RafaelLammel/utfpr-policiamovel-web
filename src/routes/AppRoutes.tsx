import React from 'react';
import HomePage from '../pages/Home';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateUserPage from "../pages/CreateUser";

const AppRoutes = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/usuario/criar" element={<CreateUserPage/>} />
        </Routes>
    </BrowserRouter>
    );
};

export default AppRoutes;