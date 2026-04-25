import { Outlet } from 'react-router-dom';
import { Navbar } from './ui/floating-navbar';

export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}