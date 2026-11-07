import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="hospital-mark">H</div>
        <div>
          <h2>Northstar</h2>
          <span>Hospital System</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-section">WORKSPACE</p>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>▦</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/patients"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>♙</span>
          My Patients
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="system-status">
          <span className="status-dot"></span>
          System operational
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;