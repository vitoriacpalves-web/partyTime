
import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//layouts
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

//pages
import Home from './routes/Home.jsx';
import CreateParty from './routes/CreateParty.jsx';
import DetailsParty from './routes/DetailsParty.jsx'
import EditParty from "./routes/EditParties.jsx"
import Login from './routes/LoginPage.jsx'


const router = createBrowserRouter([

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,

      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: < Home />
      },
      {
        path: "/create-new-party",
        element: < CreateParty />
      },
      {
        path: "/party/:id",
        element: < DetailsParty />
      },
      {
        path: "party/edit/:id",
        element: < EditParty />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>
)
