import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results || [];
        setWorkouts(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="octofit-spinner">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading workouts...</span>
        </div>
        <p className="mt-3 text-muted">Loading workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">&#9888;</span>
          <div><strong>Error loading workouts:</strong> {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="card data-card">
        {/* Card Header */}
        <div className="card-header d-flex align-items-center justify-content-between">
          <h2 className="mb-0">💪 Workouts <span className="count-badge">{workouts.length}</span></h2>
        </div>

        {/* Card Body – Table */}
        <div className="card-body">
          {workouts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💪</div>
              <p className="fw-semibold">No workouts found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Workout Name</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout._id || workout.id}>
                      <td className="text-muted">{index + 1}</td>
                      <td>
                        <strong>{workout.name}</strong>
                      </td>
                      <td className="text-muted">{workout.description}</td>
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

export default Workouts;
