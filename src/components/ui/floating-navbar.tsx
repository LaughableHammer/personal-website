import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Scoreboard', link: '/comps' },
  { name: 'Challenges', link: '/blog' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light',
  );
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const syncWithPreference = () => {
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const preferredTheme = storedTheme ?? (query.matches ? 'dark' : 'light');
      setTheme(preferredTheme);
      document.documentElement.setAttribute('data-bs-theme', preferredTheme);
    };

    query.addEventListener('change', syncWithPreference);
    return () => query.removeEventListener('change', syncWithPreference);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-bs-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <nav className="site-navbar" aria-label="Primary navigation">
      <div className="site-container navbar-inner">
        <NavLink className="navbar-brand" to="/">
          LaughableHammer
        </NavLink>
        <button
          className="navbar-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <div id="primary-menu" className={`navbar-menu${open ? ' is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.link}
              to={item.link}
              end={item.link === '/'}
              className={({ isActive }) => `navbar-link${isActive ? ' is-active' : ''}`}
            >
              {item.name}
            </NavLink>
          ))}
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navbar-link navbar-profile${isActive ? ' is-active' : ''}`}
          >
            <i className="fas fa-user-circle pe-1" aria-hidden="true" />
            Profile
          </NavLink>
          <button
            className="theme-switch"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title="Toggle theme"
          >
            <i
              className={`fas d-none d-md-inline ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}
              aria-hidden="true"
            />
            <span className="d-sm-inline d-md-none">
              <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'} pe-1`} aria-hidden="true" />
              Toggle theme
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
