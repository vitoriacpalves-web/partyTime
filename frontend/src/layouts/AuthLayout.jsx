import React from 'react'
import { Outlet } from "react-router-dom";


import "./App.css"


//styles
import "./App.css";

const AuthLayout = () => {
    return (
        <div className="App">
            < Outlet />
        </div>
    )
}

export default AuthLayout