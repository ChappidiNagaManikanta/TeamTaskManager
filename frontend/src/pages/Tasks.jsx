import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();

  const [formData, setFormData] = useState({ 
    title: '', description: '', status: 'PENDING', priority: 'MEDIUM', 
    dueDate: '', projectId: '', assigneeId: '' 
  });

  const isAdmin = user?.role === 'ROLE_ADMIN';

  const fetchTasks = async () => {
    try {
      let res;
      if (isAdmin) {
        res = await api.get('/tasks');
      } else {
        res = await api.get(`/tasks/assignee/${user.id}`);
      }
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const fetchDependencies = async () => {
    if (isAdmin) {
      try {
        const [projRes, usersRes] = await Promise.all([
          api.get('/projects'),
          api.get('/users')
        ]);
        setProjects(projRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Failed to fetch dependencies', error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    if (isAdmin) fetchDependencies();
  }, [isAdmin, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, formData);
      } else {
        await api.post('/tasks', formData);
      }
      setIsModalOpen(false);
      resetForm();
      fetchTasks();
    } catch (error) {
      console.error('Operation failed', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/tasks/${id}/status`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      projectId: task.projectId || '',
      assigneeId: task.assigneeId || ''
    });
    setEditingId(task.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('Failed to delete', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', status: 'PENDING', priority: 'MEDIUM', dueDate: '', projectId: '', assigneeId: '' });
    setEditingId(null);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'PENDING': return 'badge badge-pending';
      case 'IN_PROGRESS': return 'badge badge-progress';
      case 'COMPLETED': return 'badge badge-completed';
      default: return 'badge';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'HIGH': return 'badge badge-high';
      case 'MEDIUM': return 'badge badge-medium';
      case 'LOW': return 'badge badge-low';
      default: return 'badge';
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      const query = search.trim().toLowerCase();
      const matchesSearch = !query || [
        task.title,
        task.description,
        task.projectTitle,
        task.assigneeName,
      ].some((value) => value?.toLowerCase().includes(query));

      return matchesSearch
        && (!statusFilter || task.status === statusFilter)
        && (!priorityFilter || task.priority === priorityFilter);
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31');
    });

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('');
    setPriorityFilter('');
    setSortBy('dueDate');
  };

  return (
    <div>
      <div className="page-header">
        <h1>Tasks</h1>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}>
            <Plus size={20} /> Add Task
          </button>
        )}
      </div>

      <section className="task-filters" aria-label="Filter and sort tasks">
        <label className="task-search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            className="form-control"
            placeholder="Search tasks, projects, or assignees"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search tasks"
          />
        </label>
        <select
          className="form-control"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select
          className="form-control"
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          aria-label="Filter by priority"
        >
          <option value="">All priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <select
          className="form-control"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort tasks"
        >
          <option value="dueDate">Sort: Due date</option>
          <option value="priority">Sort: Priority</option>
          <option value="title">Sort: Title</option>
        </select>
        <button type="button" className="btn-icon task-clear-filters" onClick={clearFilters}>
          <X size={18} aria-hidden="true" />
          Clear
        </button>
      </section>

      <div className="table-container">
        <div className="task-results-count">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Project</th>
              <th>Assignee</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <td style={{ fontWeight: 500 }}>{task.title}</td>
                <td>{task.projectTitle}</td>
                <td>{task.assigneeName || 'Unassigned'}</td>
                <td>{task.dueDate}</td>
                <td><span className={getPriorityBadgeClass(task.priority)}>{task.priority}</span></td>
                <td>
                  {!isAdmin ? (
                    <select 
                      className="form-control" 
                      style={{ padding: '0.25rem', width: 'auto' }}
                      value={task.status} 
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  ) : (
                    <span className={getStatusBadgeClass(task.status)}>{task.status.replace('_', ' ')}</span>
                  )}
                </td>
                {isAdmin && (
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" onClick={() => handleEdit(task)}><Edit2 size={18} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(task.id)} style={{ color: 'var(--danger)' }}><Trash2 size={18} /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 7 : 6} style={{ textAlign: 'center', padding: '2rem' }}>
                  {tasks.length === 0 ? 'No tasks found.' : 'No tasks match your search or filters.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && isAdmin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Task' : 'New Task'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Project</label>
                  <select className="form-control" value={formData.projectId} onChange={e => setFormData({...formData, projectId: e.target.value})} required>
                    <option value="">Select Project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Assignee</label>
                  <select className="form-control" value={formData.assigneeId} onChange={e => setFormData({...formData, assigneeId: e.target.value})}>
                    <option value="">Unassigned</option>
                    {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Priority</label>
                  <select className="form-control" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Due Date</label>
                  <input type="date" className="form-control" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} required />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
