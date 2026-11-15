import { NavLink } from "react-router-dom";

function Sidebar() {
  const getNavClass = ({ isActive }) =>
    `nav-item ${isActive ? "active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="hospital-mark">H</div>

        <div>
          <h2>Hospital EHR</h2>
          <span>Hospital System</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-section">WORKSPACE</p>

        <NavLink to="/" end className={getNavClass}>
          <span>▦</span>
          Dashboard
        </NavLink>

        <NavLink to="/patients" className={getNavClass}>
          <span>♙</span>
          My Patients
        </NavLink>

        <NavLink to="/handoff" className={getNavClass}>
          <span>⇄</span>
          Handoff
        </NavLink>

        <NavLink to="/or" className={getNavClass}>
          <span>▣</span>
          OR Preparation
        </NavLink>

        <NavLink to="/phone" className={getNavClass}>
          <span>☎</span>
          Phone
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;