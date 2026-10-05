import { NavLink } from 'react-router-dom';
import { CheckSquare, FolderKanban, LayoutDashboard, LogOut, MessageSquareText, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
  { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/chat', label: 'Team Chat', icon: MessageSquareText },
  { path: '/users', label: 'Team', icon: Users, adminOnly: true },
  { path: '/contact-messages', label: 'Contact Inbox', icon: MessageSquareText, adminOnly: true },
];

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand" aria-label="Team Task Manager home">
        <CheckSquare size={24} aria-hidden="true" />
        <span>Team Task Manager</span>
      </NavLink>

      <nav className="navbar-links" aria-label="Main navigation">
        {navItems
          .filter((item) => !item.adminOnly || user?.role === 'ROLE_ADMIN')
          .map(({ path, label, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="navbar-account">
        <div className="navbar-user">
          <span className="navbar-user-name">{user?.name}</span>
          <span className="navbar-user-role">
            {user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Team Member'}
          </span>
        </div>
        <button type="button" onClick={logout} className="navbar-logout">
          <LogOut size={18} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
