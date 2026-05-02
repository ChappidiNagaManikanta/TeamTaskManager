import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Briefcase, CheckSquare, Clock, LayoutDashboard, Settings, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  const statCards = [
    { title: 'Total Projects', value: stats.totalProjects, icon: Briefcase, color: 'primary' },
    { title: 'Total Tasks', value: stats.totalTasks, icon: LayoutDashboard, color: 'primary' },
    { title: 'Pending Tasks', value: stats.pendingTasks, icon: Clock, color: 'warning' },
    { title: 'In Progress', value: stats.inProgressTasks, icon: Activity, color: 'primary' },
    { title: 'Completed', value: stats.completedTasks, icon: CheckSquare, color: 'success' },
    { title: 'Overdue', value: stats.overdueTasks, icon: Settings, color: 'danger' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard Overview</h1>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="table-container" style={{ padding: '2rem' }}>
        <h2>Welcome, {user?.name}!</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          This is your Team Task Manager dashboard. Use the sidebar to navigate to your projects and tasks.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
