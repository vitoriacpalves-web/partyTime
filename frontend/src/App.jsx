import React from 'react';
import { Outlet } from "react-router-dom";

//componentes
import Navbar from './components/Navbar';

import { ToastContainer } from 'react-toastify';

import "./App.css"


//styles
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      < Outlet />
    </div>
  )
}

export default App