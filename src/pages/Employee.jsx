
import { useEffect, useState } from "react";
import "./Employee.css";
import { getEmployees } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../services/authService";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  async function fetchEmployees() {
    try {
      setLoading(true)  
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleDelete(id) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmed) return;

  try {
    await deleteEmployee(id);

    fetchEmployees();
  } catch (error) {
    alert(error.message || "Failed to delete employee");
  }
  }
  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="employees-page">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2>Employees</h2>
          <p className="text-secondary mb-0">Manage your employee records.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/employee/add")}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Employee
        </button>
      </div>

      <div className="employee-summary mb-4">
        <i className="bi bi-people-fill"></i>
        <div>
          <span>Total Employees</span>
          <h3>{employees.length}</h3>
        </div>
      </div>

      <div className="card border-0 shadow-sm employee-table-card">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-name">
                      <div className="employee-avatar">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <div className="fw-semibold">{employee.name}</div>
                        <small className="text-secondary">
                          {employee.email}
                        </small>
                      </div>
                    </div>
                  </td>

                  <td>{employee.department}</td>
                  <td>{employee.role}</td>

                  <td>
                    <span
                      className={`employee-status ${
                        employee.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    <div className="employee-actions">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          navigate(`/employee/edit/${employee.id}`)
                        }
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employee;
