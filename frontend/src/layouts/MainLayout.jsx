import React from 'react';
import { Outlet } from "react-router-dom";

//componentes
import Navbar from '../components/Navbar';

import "./App.css"


//styles
import "./App.css";


const MainLayout = () => {
    return (
        <div className="App">
            <Navbar />
            < Outlet />
        </div>
    )
}

export default MainLayout