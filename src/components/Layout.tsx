import { Outlet } from 'react-router-dom';
import { Navbar } from './ui/floating-navbar';

export function Layout() {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-container">Powered by CTFd</div>
      </footer>
    </div>
  );
}
