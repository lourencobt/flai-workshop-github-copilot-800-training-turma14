import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="octofit-spinner">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading activities...</span>
        </div>
        <p className="mt-3 text-muted">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-2">&#9888;</span>
          <div><strong>Error loading activities:</strong> {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="card data-card">
        {/* Card Header */}
        <div className="card-header d-flex align-items-center justify-content-between">
          <h2 className="mb-0">🏃 Activities <span className="count-badge">{activities.length}</span></h2>
        </div>

        {/* Card Body – Table */}
        <div className="card-body">
          {activities.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏃</div>
              <p className="fw-semibold">No activities found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity._id || activity.id}>
                      <td className="text-muted">{index + 1}</td>
                      <td><strong>{activity.user}</strong></td>
                      <td>
                        <span className="activity-badge">{activity.activity_type}</span>
                      </td>
                      <td>
                        <span className="duration-badge">{activity.duration} min</span>
                      </td>
                      <td>{activity.date}</td>
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

export default Activities;
