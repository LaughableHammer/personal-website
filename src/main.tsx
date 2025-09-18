import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Blog from "./pages/blog";
import Competitions from "./pages/competitions";
import { Navbar } from './components/ui/floating-navbar';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/blog", element: <Blog /> },
  { path: "/comps", element: <Competitions /> },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </StrictMode>,
)
