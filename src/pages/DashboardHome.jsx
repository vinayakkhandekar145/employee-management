import { useEffect, useState } from "react";
import { getEmployees } from "../services/authService";
import "./DashboardHome.css";

function DashboardHome() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (err) {
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;
  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="dashboard-home">
      <div className="dashboard-heading mb-4">
        <h2>Welcome to EmployeeHub!</h2>
        <p className="text-secondary mb-0">
          Here's an overview of your employee management system.
        </p>
      </div>

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <i className="bi bi-people fs-1 text-primary"></i>
              <div>
                <p className="text-secondary mb-1">Total Employees</p>
                <h3 className="mb-0">{totalEmployees}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <i className="bi bi-person-check fs-1 text-success"></i>
              <div>
                <p className="text-secondary mb-1">Active Employees</p>
                <h3 className="mb-0">{activeEmployees}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <i className="bi bi-person-x fs-1 text-danger"></i>
              <div>
                <p className="text-secondary mb-1">Inactive Employees</p>
                <h3 className="mb-0">{inactiveEmployees}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent employees */}
      
<div className="card border-0 shadow-sm recent-employees-card">
  <div className="card-body p-3 p-md-4">
    <h5 className="mb-3">Recent Employees</h5>

    {employees.length === 0 ? (
      <p className="text-secondary mb-0">
        No employees available.
      </p>
    ) : (
      <div className="table-responsive">
        <table className="table align-middle mb-0 dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.slice(-5).reverse().map((employee) => (
              <tr key={employee.id}>
                <td className="dashboard-employee-name">
                  {employee.name}
                </td>
                <td>{employee.department}</td>
                <td>{employee.role}</td>
                <td>
                  <span
                    className={`badge ${
                      employee.status === "Active"
                        ? "text-bg-success"
                        : "text-bg-secondary"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
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

export default DashboardHome;