import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results || [];
        setTeams(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="octofit-spinner">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading teams...</span>
        </div>
        <p className="mt-3 text-muted">Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">&#9888;</span>
          <div><strong>Error loading teams:</strong> {error}</div>
        </div>
      </div>
    );
  }

  const renderMembers = (members) => {
    const list = Array.isArray(members) ? members : String(members).split(',');
    return list.map((m, i) => (
      <span key={i} className="member-badge">{String(m).trim()}</span>
    ));
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card data-card">
        {/* Card Header */}
        <div className="card-header d-flex align-items-center justify-content-between">
          <h2 className="mb-0">👥 Teams <span className="count-badge">{teams.length}</span></h2>
        </div>

        {/* Card Body – Table */}
        <div className="card-body">
          {teams.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <p className="fw-semibold">No teams found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Members</th>
                    <th scope="col" className="text-center">Member Count</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => {
                    const memberList = Array.isArray(team.members)
                      ? team.members
                      : String(team.members || '').split(',').filter(Boolean);
                    return (
                      <tr key={team._id || team.id}>
                        <td className="text-muted">{index + 1}</td>
                        <td><strong>{team.name}</strong></td>
                        <td>{renderMembers(team.members)}</td>
                        <td className="text-center">
                          <span className="badge bg-info text-dark">{memberList.length}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
