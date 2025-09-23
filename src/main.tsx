import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const App = lazy(() => import('./App'));
const Blog = lazy(() => import('./pages/blog'));
const Competitions = lazy(() => import('./pages/competitions'));
import { Navbar } from './components/ui/floating-navbar';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/blog', element: <Blog /> },
  { path: '/comps', element: <Competitions /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
);
