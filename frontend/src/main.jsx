
import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Home from './routes/Home.jsx';
import CreateParty from './routes/CreateParty.jsx';
import DetailsParty from './routes/DetailsParty.jsx'
import EditParty from "./routes/EditParties.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
        path: "/party/edit/:id",
        element: < EditParty />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
