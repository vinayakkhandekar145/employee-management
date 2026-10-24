import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <i className="bi bi-people-fill"></i>
        <span>EmployeeHub</span>
      </div>

      <div className="sidebar-menu">
        <p className="sidebar-heading">MENU</p>

        <NavLink to="/dashboard" className="sidebar-link">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </NavLink>
         <NavLink to="/profile" className="sidebar-link">
         <i className="bi bi-person-circle"></i>
         <span>My Profile</span>
        </NavLink>

        <NavLink to="/employee" className="sidebar-link">
          <i className="bi bi-people"></i>
          <span>Employee</span>
        </NavLink>
        <NavLink to="/help" className="sidebar-link">
          <i className="bi  bi-headset"></i>
          <span>Help & Support</span>
        </NavLink>
      </div>

      <div className="sidebar-bottom">
        <i className="bi bi-shield-check"></i>
        Employee Management
      </div>
    </aside>
  );
}

export default Sidebar;