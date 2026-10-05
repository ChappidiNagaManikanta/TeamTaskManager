import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bell, CheckSquare, ChevronRight, Menu, X } from 'lucide-react';

const navPages = [
  { to: '/', label: 'Home', end: true },
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const PublicNavbar = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notificationsRef = useRef(null);

  useEffect(() => {
    if (!notificationsOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!notificationsRef.current?.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setNotificationsOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [notificationsOpen]);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
  };

  const renderPageLink = ({ to, label, end }) => (
    <NavLink
      key={to}
      to={to}
      end={end}
      onClick={closeMenus}
      className={({ isActive }) => isActive ? 'active' : undefined}
    >
      {label}
    </NavLink>
  );

  return (
    <header className="landing-header">
      <Link
        to="/"
        className="landing-brand"
        aria-label="TaskFlow home"
        onClick={closeMenus}
      >
        <span className="landing-brand-icon"><CheckSquare size={20} aria-hidden="true" /></span>
        <span className="landing-brand-text">TaskFlow</span>
      </Link>

      <nav className="landing-nav" aria-label="Main navigation">
        {navPages.map(renderPageLink)}
      </nav>

      <div className="landing-actions">
        <div className="landing-notif-container" ref={notificationsRef}>
          <button
            type="button"
            className="landing-notif-btn"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            aria-controls="landing-notifications"
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <Bell size={19} aria-hidden="true" />
          </button>
          {notificationsOpen && (
            <div className="landing-notif-dropdown" id="landing-notifications">
              <div className="landing-notif-header"><strong>Notifications</strong></div>
              <div className="landing-notif-empty">
                <Bell size={22} aria-hidden="true" />
                <span>Log in to see your task notifications.</span>
              </div>
              <div className="landing-notif-footer">
                <Link to="/login" onClick={() => setNotificationsOpen(false)}>
                  Log in to your workspace <ChevronRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="landing-auth-links">
          <Link to="/login" className="landing-login">Login</Link>
          <Link to="/register" className="landing-register">Register</Link>
        </div>
        <button
          type="button"
          className="landing-mobile-toggle"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="landing-mobile-menu">
          <nav className="landing-mobile-nav" aria-label="Mobile navigation">
            {navPages.map(renderPageLink)}
          </nav>
          <div className="landing-mobile-auth">
            <Link to="/login" className="landing-login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            <Link to="/register" className="landing-register" onClick={() => setMobileMenuOpen(false)}>Register</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
