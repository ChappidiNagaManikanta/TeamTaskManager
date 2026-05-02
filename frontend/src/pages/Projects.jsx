import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', startDate: '', endDate: '' });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      setIsModalOpen(false);
      setFormData({ title: '', description: '', startDate: '', endDate: '' });
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error('Operation failed', error);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate
    });
    setEditingId(project.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Failed to delete', error);
      }
    }
  };

  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <div>
      <div className="page-header">
        <h1>Projects</h1>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => {
            setEditingId(null);
            setFormData({ title: '', description: '', startDate: '', endDate: '' });
            setIsModalOpen(true);
          }}>
            <Plus size={20} /> Add Project
          </button>
        )}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Admin</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td style={{ fontWeight: 500 }}>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.adminName}</td>
                {isAdmin && (
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" onClick={() => handleEdit(project)}><Edit2 size={18} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(project.id)} style={{ color: 'var(--danger)' }}><Trash2 size={18} /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} style={{ textAlign: 'center', padding: '2rem' }}>
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Project' : 'New Project'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" className="form-control" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input type="date" className="form-control" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} required />
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

export default Projects;
