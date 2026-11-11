const currentNurse = {
  first_name: "Sarah",
  last_name: "Thompson",
  role: "RN",
};

function Topbar() {
  return (
    <header className="topbar">
      <div>
        <span className="topbar-label">GENERAL MEDICAL WARD</span>
      </div>

      <div className="nurse-profile">
        <div className="avatar">
          {currentNurse.first_name[0]}
          {currentNurse.last_name[0]}
        </div>

        <div>
          <strong>
            {currentNurse.first_name} {currentNurse.last_name}
          </strong>

          <span>{currentNurse.role}</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;