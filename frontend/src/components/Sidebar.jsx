import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FolderKanban, CheckSquare, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/projects', label: 'Projects', icon: FolderKanban },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        Team Task Manager
      </div>
      
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{user?.name}</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Team Member'}
        </p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button onClick={logout} className="logout-btn">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
