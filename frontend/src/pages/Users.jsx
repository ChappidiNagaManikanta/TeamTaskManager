import { useEffect, useMemo, useState } from 'react';
import { Search, Users } from 'lucide-react';
import api from '../api/axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (requestError) {
        console.error('Failed to fetch users', requestError);
        setError('Unable to load team members. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) =>
      [user.name, user.email, user.role].some((value) => value?.toLowerCase().includes(query))
    );
  }, [search, users]);

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Team members</h1>
          <p className="page-description">Browse registered users and their project roles.</p>
        </div>
        <div className="user-count">
          <Users size={18} aria-hidden="true" />
          {users.length} {users.length === 1 ? 'member' : 'members'}
        </div>
      </div>

      <label className="user-search">
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          className="form-control"
          placeholder="Search by name, email, or role"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search team members"
        />
      </label>

      {loading ? (
        <p role="status">Loading team members...</p>
      ) : error ? (
        <p className="error-message" role="alert">{error}</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((member) => (
                <tr key={member.id}>
                  <td className="user-name-cell">{member.name}</td>
                  <td>{member.email}</td>
                  <td>
                    <span className={`badge ${member.role === 'ROLE_ADMIN' ? 'badge-progress' : 'badge-low'}`}>
                      {member.role === 'ROLE_ADMIN' ? 'Administrator' : 'Team Member'}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="3" className="table-empty">
                    {users.length ? 'No members match your search.' : 'No team members found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default UsersPage;
