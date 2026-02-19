import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Workouts from './components/Workouts';

const featureCards = [
  {
    icon: '👤',
    title: 'Users',
    headerClass: 'fc-green',
    desc: 'Manage athlete profiles and user accounts for your fitness community.',
    to: '/users',
    btnColor: 'fc-btn-green',
    buttons: ['Open Users', 'View Profiles'],
  },
  {
    icon: '🏃',
    title: 'Activities',
    headerClass: 'fc-blue',
    desc: 'Log and track your daily fitness activities, runs, cycles, and more.',
    to: '/activities',
    btnColor: 'fc-btn-blue',
    buttons: ['Log Activity', 'View History'],
  },
  {
    icon: '🏆',
    title: 'Leaderboard',
    headerClass: 'fc-orange',
    desc: 'See how you rank against your teammates with real-time standings.',
    to: '/leaderboard',
    btnColor: 'fc-btn-orange',
    buttons: ['View Rankings', 'My Score'],
  },
  {
    icon: '👥',
    title: 'Teams',
    headerClass: 'fc-purple',
    desc: 'Create and manage your fitness teams for group challenges.',
    to: '/teams',
    btnColor: 'fc-btn-purple',
    buttons: ['Browse Teams', 'My Team'],
  },
  {
    icon: '💪',
    title: 'Workouts',
    headerClass: 'fc-red',
    desc: 'Browse personalized workout suggestions tailored to your goals.',
    to: '/workouts',
    btnColor: 'fc-btn-red',
    buttons: ['View Workouts', 'My Plan'],
  },
];

/* ── Top navbar search state lives here so it's accessible ── */
function NavBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const match = featureCards.find(
      (f) => f.title.toLowerCase().includes(q)
    );
    if (match) navigate(match.to);
  };

  return (
    <>
      {/* ── Primary navbar ── */}
      <nav className="navbar octofit-top-nav">
        <div className="container-fluid px-3">
          {/* Brand */}
          <NavLink className="navbar-brand me-4" to="/">
            <img
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt=""
              height="26"
              className="me-2"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span>Octo<span className="brand-accent">Fit</span> Tracker</span>
          </NavLink>

          {/* Nav links */}
          <div className="d-none d-lg-flex align-items-center me-auto gap-1">
            {['Tutorials', 'References', 'Exercises', 'Certificates'].map((lbl) => (
              <NavLink key={lbl} className="nav-link-top" to="/">
                {lbl}
              </NavLink>
            ))}
          </div>

          {/* Search bar */}
          <form className="octofit-search-bar ms-auto" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search sections…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">&#128269;</button>
          </form>
        </div>
      </nav>

      {/* ── Category navbar ── */}
      <div className="octofit-cat-nav">
        <div className="cat-nav-inner px-2">
          {featureCards.map((f) => (
            <NavLink
              key={f.to}
              to={f.to}
              className={({ isActive }) => isActive ? 'cat-active' : ''}
            >
              {f.icon} {f.title}
            </NavLink>
          ))}
          <NavLink to="/">🏠 Home</NavLink>
          <span style={{ color: 'rgba(255,255,255,0.3)', padding: '0 0.5rem' }}>|</span>
          {['About', 'Help', 'Settings'].map((lbl) => (
            <NavLink key={lbl} to="/" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {lbl}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const match = featureCards.find((f) => f.title.toLowerCase().includes(q));
    if (match) navigate(match.to);
  };

  return (
    <>
      {/* ── Hero ── */}
      <div className="octofit-hero">
        <h1>&#x1F419; Track Your Fitness</h1>
        <p className="hero-subtitle">
          With OctoFit Tracker — the team fitness platform
        </p>
        <form className="hero-search-bar" onSubmit={handleHeroSearch}>
          <input
            type="text"
            placeholder="Search sections, e.g. Activities"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">&#128269; Search</button>
        </form>
        <p className="hero-hint">
          <a href="#explore">Not Sure Where To Begin?</a>
        </p>
      </div>

      {/* ── Feature cards ── */}
      <section className="feature-section" id="explore">
        <div className="container">
          <h2 className="section-heading">Explore the App</h2>
          <div className="row g-4">
            {featureCards.map((f) => (
              <div className="col-12 col-sm-6 col-md-4" key={f.to}>
                <div className="feature-card">
                  {/* Colored header */}
                  <div className={`fc-header ${f.headerClass}`}>
                    <div className="fc-icon">{f.icon}</div>
                    <h3 className="fc-title">{f.title}</h3>
                  </div>
                  {/* Body */}
                  <div className="fc-body">
                    <p className="fc-desc">{f.desc}</p>
                    <NavLink to={f.to} className={`fc-btn ${f.btnColor}`}>
                      {f.buttons[0]}
                    </NavLink>
                    <NavLink to={f.to} className="fc-btn fc-btn-dark">
                      {f.buttons[1]}
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        {/* ── Page content ── */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/users"       element={<Users />} />
            <Route path="/activities"  element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams"       element={<Teams />} />
            <Route path="/workouts"    element={<Workouts />} />
          </Routes>
        </main>

        {/* ── Footer ── */}
        <footer className="octofit-footer">
          &copy; {new Date().getFullYear()} OctoFit Tracker &mdash; Powered by{' '}
          <a href="https://react.dev" target="_blank" rel="noreferrer">React</a>{' '}
          &amp;{' '}
          <a href="https://www.djangoproject.com" target="_blank" rel="noreferrer">Django</a>
        </footer>
      </div>
    </Router>
  );
}

export default App;

