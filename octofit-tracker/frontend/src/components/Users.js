import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results || [];
        setUsers(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="octofit-spinner">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading users...</span>
        </div>
        <p className="mt-3 text-muted">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">&#9888;</span>
          <div><strong>Error loading users:</strong> {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="card data-card">
        {/* Card Header */}
        <div className="card-header d-flex align-items-center justify-content-between">
          <h2 className="mb-0">👤 Users <span className="count-badge">{users.length}</span></h2>
        </div>

        {/* Card Body – Table */}
        <div className="card-body">
          {users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👤</div>
              <p className="fw-semibold">No users found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id || user.id || user.username}>
                      <td className="text-muted">{index + 1}</td>
                      <td><strong>{user.username}</strong></td>
                      <td>
                        <a href={`mailto:${user.email}`} className="link-primary text-decoration-none">
                          {user.email}
                        </a>
                      </td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
