
import { useEffect, useState } from "react";
import { createEmployee } from "../services/authService";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
} from "../services/authService"
function AddEmp() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    status: "Active",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    useEffect(() => {
     if (id) {
     loadEmployee();
    }
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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.department ||
      !formData.role.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await createEmployee(formData);
      navigate("/employee");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
    async function handleEdit(e) {
      e.preventDefault();
      setError("");
  
      try {
        setLoading(true);
        await updateEmployee(id, formData);
        navigate("/employee");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Add Employee</h2>
          <p className="text-secondary">
            Enter the employee details below.
          </p>
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/employee")}
        >
          Back
        </button>
      </div>

      <div className="card border-0 shadow-sm p-4">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={id ? handleEdit :handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Department *</label>
              <select
                name="department"
                className="form-select"
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
              <label className="form-label">Role *</label>
              <input
                type="text"
                name="role"
                className="form-control"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Employee"}
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
    </div>
  );
}

export default AddEmp;
