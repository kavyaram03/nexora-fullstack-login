import "./Dashboard.css";

function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>NEXORA<span>.</span></h2>
        <button onClick={onLogout} className="logout-btn">
          Log out
        </button>
      </header>

      <main className="dashboard-content">
        <p className="dashboard-label">YOUR WORKSPACE</p>

        <h1>Welcome back, {user?.name || "Explorer"}!</h1>

        <p className="dashboard-description">
          Your digital workspace is ready.
          Stay focused, stay creative, and make today count.
        </p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <span>✦</span>
            <h3>My Workspace</h3>
            <p>Your personal space for ideas and productivity.</p>
          </div>

          <div className="dashboard-card">
            <span>◈</span>
            <h3>Projects</h3>
            <p>Organize your work and explore new possibilities.</p>
          </div>

          <div className="dashboard-card">
            <span>◎</span>
            <h3>Profile</h3>
            <p>Signed in as {user?.email || "Demo user"}.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;