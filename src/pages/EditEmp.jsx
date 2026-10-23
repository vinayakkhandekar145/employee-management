
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
} from "../services/authService"

function EditEmp() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmployee() {
      try {
        const employee = await getEmployeeById(id);
        setFormData({
          name: employee.name || "",
          email: employee.email || "",
          department: employee.department || "",
          role: employee.role || "",
          status: employee.status || "Active",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadEmployee();
  }, [id]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);
      await updateEmployee(id, formData);
      navigate("/employee");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading employee...</p>;

  if (error && !formData.name) {
    return (
      <div>
        <p className="text-danger">{error}</p>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/employee")}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Edit Employee</h2>
      <p className="text-secondary">Update employee details.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Role</label>
            <input
              className="form-control"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button className="btn btn-primary" disabled={saving}>
            {saving ? "Updating..." : "Update Employee"}
          </button>

          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/employee")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmp;
