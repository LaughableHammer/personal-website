import { lazy, StrictMode, useEffect, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';

const App = lazy(() => import('./App'));
const Blog = lazy(() => import('./pages/blog'));
const Competitions = lazy(() => import('./pages/competitions'));
const BlogPost = lazy(() => import('./pages/blog/PostPage'));
const Drone = lazy(() => import('./pages/drone'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'comps', element: <Competitions /> },
      { path: 'drone', element: <Drone /> },
    ],
  },
]);

function Root() {
  useEffect(() => {
    const preload = () => {
      import('./pages/blog');
      import('./pages/blog/PostPage');
      import('./pages/competitions');
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preload);
    } else {
      setTimeout(preload, 200);
    }
  }, []);

  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);