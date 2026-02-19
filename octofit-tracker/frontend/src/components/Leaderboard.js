import React, { useState, useEffect } from 'react';

const RANK_ICONS = ['🥇', '🥈', '🥉'];

function getRankClass(index) {
  if (index === 0) return 'rank-badge rank-1';
  if (index === 1) return 'rank-badge rank-2';
  if (index === 2) return 'rank-badge rank-3';
  return 'rank-badge rank-other';
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="octofit-spinner">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading leaderboard...</span>
        </div>
        <p className="mt-3 text-muted">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">&#9888;</span>
          <div><strong>Error loading leaderboard:</strong> {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="card data-card">
        {/* Card Header */}
        <div className="card-header d-flex align-items-center justify-content-between">
          <h2 className="mb-0">🏆 Leaderboard <span className="count-badge">{leaderboard.length}</span></h2>
        </div>

        {/* Card Body – Table */}
        <div className="card-body">
          {leaderboard.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏆</div>
              <p className="fw-semibold">No leaderboard data found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th scope="col" className="text-center" style={{ width: '80px' }}>Rank</th>
                    <th scope="col">Username</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry._id || entry.id || index}
                        className={index === 0 ? 'table-warning' : ''}>
                      <td className="text-center">
                        <span className={getRankClass(index)}>
                          {index < 3 ? RANK_ICONS[index] : index + 1}
                        </span>
                      </td>
                      <td>
                        <strong>{entry.user || entry.username}</strong>
                        {index === 0 && <span className="badge bg-warning text-dark ms-2">Leader</span>}
                      </td>
                      <td><span className="score-pill">{entry.score}</span></td>
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

export default Leaderboard;
