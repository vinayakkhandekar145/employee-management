import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import './Layout.css'

function Dashboard({ user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle =
    location.pathname === "/employee" ? "Employee" : "Dashboard";

  function handleLogout() {
    onLogout();
    navigate("/login");
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="topbar">
          <h5>{pageTitle}</h5>

          <div className="user-info">
            <i className="bi bi-person-circle"></i>
            <span>{user.name}</span>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;