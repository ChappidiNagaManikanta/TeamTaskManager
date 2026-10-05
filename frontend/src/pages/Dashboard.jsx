import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Briefcase, CheckSquare, Clock, LayoutDashboard, Settings, Activity, AlertCircle, CalendarDays, ChevronDown, ChevronUp, FolderKanban } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        const taskRequest = user?.role === 'ROLE_ADMIN'
          ? api.get('/tasks')
          : api.get(`/tasks/assignee/${user.id}`);
        const [tasksResponse, projectsResponse] = await Promise.all([
          taskRequest,
          api.get('/projects'),
        ]);
        setTasks(tasksResponse.data);
        setProjects(projectsResponse.data);
      } catch (requestError) {
        console.error('Failed to fetch dashboard data', requestError);
        setError('Unable to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [user?.id, user?.role]);

  if (loading) return <div role="status">Loading dashboard...</div>;
  if (error) return <div className="error-message" role="alert">{error}</div>;

  const toDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const today = toDateKey(new Date());
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'PENDING').length,
    inProgress: tasks.filter((task) => task.status === 'IN_PROGRESS').length,
    completed: tasks.filter((task) => task.status === 'COMPLETED').length,
    overdue: tasks.filter(
      (task) => task.status !== 'COMPLETED' && task.dueDate && task.dueDate < today
    ).length,
  };
  const statCards = [
    { id: 'projects', title: 'Total Projects', value: projects.length, icon: Briefcase, color: 'primary' },
    { id: 'all', title: 'Total Tasks', value: taskStats.total, icon: LayoutDashboard, color: 'primary' },
    { id: 'pending', title: 'Pending Tasks', value: taskStats.pending, icon: Clock, color: 'warning' },
    { id: 'in-progress', title: 'In Progress', value: taskStats.inProgress, icon: Activity, color: 'primary' },
    { id: 'completed', title: 'Completed', value: taskStats.completed, icon: CheckSquare, color: 'success' },
    { id: 'overdue', title: 'Overdue', value: taskStats.overdue, icon: Settings, color: 'danger' },
  ];

  const upcomingLimit = new Date();
  upcomingLimit.setDate(upcomingLimit.getDate() + 7);
  const upcomingThrough = toDateKey(upcomingLimit);
  const activeTasks = tasks.filter((task) => task.status !== 'COMPLETED' && task.dueDate);
  const byDueDate = (a, b) => a.dueDate.localeCompare(b.dueDate);
  const overdueTasks = activeTasks
    .filter((task) => task.dueDate < today)
    .sort(byDueDate)
    .slice(0, 5);
  const upcomingTasks = activeTasks
    .filter((task) => task.dueDate >= today && task.dueDate <= upcomingThrough)
    .sort(byDueDate)
    .slice(0, 5);
  const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString();
  const taskGroups = {
    all: tasks,
    pending: tasks.filter((task) => task.status === 'PENDING'),
    'in-progress': tasks.filter((task) => task.status === 'IN_PROGRESS'),
    completed: tasks.filter((task) => task.status === 'COMPLETED'),
    overdue: tasks.filter((task) => task.status !== 'COMPLETED' && task.dueDate && task.dueDate < today),
  };
  const selectedTitle = statCards.find((card) => card.id === selectedCard)?.title;
  const selectedTasks = taskGroups[selectedCard] || [];

  const TaskList = ({ items, emptyMessage, overdue = false }) => (
    items.length ? (
      <ul className="dashboard-task-list">
        {items.map((task) => (
          <li key={task.id} className="dashboard-task-item">
            <div>
              <strong>{task.title}</strong>
              <span>{task.projectTitle || 'No project'}{task.assigneeName ? ` · ${task.assigneeName}` : ''}</span>
            </div>
            <span className={`dashboard-task-date${overdue ? ' overdue' : ''}`}>
              {formatDate(task.dueDate)}
            </span>
          </li>
        ))}
      </ul>
    ) : <p className="dashboard-empty">{emptyMessage}</p>
  );

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard Overview</h1>
      </div>

      <div className="stats-grid">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const isSelected = selectedCard === stat.id;
          return (
            <button
              key={stat.id}
              type="button"
              className={`stat-card${isSelected ? ' selected' : ''}`}
              onClick={() => setSelectedCard(isSelected ? null : stat.id)}
              aria-expanded={isSelected}
              aria-controls="dashboard-stat-details"
              aria-label={`${stat.title}: ${stat.value}. Click to view details`}
            >
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
              {isSelected ? <ChevronUp className="stat-card-chevron" size={18} /> : <ChevronDown className="stat-card-chevron" size={18} />}
            </button>
          );
        })}
      </div>

      {selectedCard && (
        <section className="dashboard-stat-details" id="dashboard-stat-details" aria-live="polite">
          <div className="dashboard-stat-details-heading">
            <div>
              <span className="dashboard-details-eyebrow">OVERVIEW DETAILS</span>
              <h2>{selectedTitle}</h2>
            </div>
            <span className="dashboard-details-count">
              {selectedCard === 'projects' ? projects.length : selectedTasks.length}
              {' '}
              {selectedCard === 'projects'
                ? projects.length === 1 ? 'project' : 'projects'
                : selectedTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {selectedCard === 'projects' ? (
            projects.length ? (
              <ul className="dashboard-detail-list">
                {projects.map((project) => (
                  <li key={project.id} className="dashboard-detail-row">
                    <span className="dashboard-detail-icon project"><FolderKanban size={18} /></span>
                    <div className="dashboard-detail-main">
                      <strong>{project.title}</strong>
                      <span>{project.description || 'No description provided'}</span>
                    </div>
                    <span className="dashboard-detail-meta">
                      {project.adminName ? `Managed by ${project.adminName}` : 'Project'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dashboard-empty">No projects found.</p>
            )
          ) : selectedTasks.length ? (
            <ul className="dashboard-detail-list">
              {selectedTasks.map((task) => (
                <li key={task.id} className="dashboard-detail-row">
                  <span className={`dashboard-detail-icon ${task.status === 'COMPLETED' ? 'complete' : 'task'}`}>
                    <CheckSquare size={18} />
                  </span>
                  <div className="dashboard-detail-main">
                    <strong>{task.title}</strong>
                    <span>{task.projectTitle || 'No project'} · Assigned to: {task.assigneeName || 'Unassigned'}</span>
                  </div>
                  <span className={`badge ${task.status === 'COMPLETED' ? 'badge-completed' : task.status === 'IN_PROGRESS' ? 'badge-progress' : 'badge-pending'}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dashboard-empty">
              {selectedCard === 'all' ? 'No tasks found.' : `No ${selectedTitle.toLowerCase()} found.`}
            </p>
          )}

          <div className="dashboard-details-footer">
            <Link to={selectedCard === 'projects' ? '/projects' : '/tasks'}>
              View {selectedCard === 'projects' ? 'projects' : 'tasks'}
            </Link>
          </div>
        </section>
      )}
      
      <div className="table-container" style={{ padding: '2rem' }}>
        <h2>Welcome, {user?.name}!</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Here is a snapshot of your projects and tasks. Visit <Link to="/tasks">Tasks</Link> to manage your work.
        </p>
      </div>

      <div className="dashboard-work-grid">
        <section className="dashboard-work-card">
          <div className="dashboard-work-heading">
            <h2><AlertCircle size={20} /> Overdue tasks</h2>
            <Link to="/tasks">View all</Link>
          </div>
          <TaskList items={overdueTasks} emptyMessage="You have no overdue tasks." overdue />
        </section>
        <section className="dashboard-work-card">
          <div className="dashboard-work-heading">
            <h2><CalendarDays size={20} /> Due in the next 7 days</h2>
            <Link to="/tasks">View all</Link>
          </div>
          <TaskList items={upcomingTasks} emptyMessage="No tasks are due in the next 7 days." />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
