import { useState } from "react";
import { useAuth } from "./context/AuthContext";

function MyProfile() {
  const { user, updateUser } = useAuth();
  const [submitted, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.name || "",
    account: "Active",
  });
  function handleSubmit(e) {
      e.preventDefault();
      setSubmit(true)
    try {

      updateUser({
        name: formData.name,
        email: formData.email,
      });
      setSubmit(false)
    } catch {
      setSubmit(false)

    }
  }
 function handleChange(e) {
  const { name, value } = e.target;
  
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}
  return (
    <div className="container-fluid p-3 p-md-4">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My Profile</h2>
        <p className="text-secondary mb-0">
          View and manage your personal information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
            <div
              className="rounded-circle bg-primary text-white d-flex
              align-items-center justify-content-center"
              style={{ width: "90px", height: "90px", fontSize: "32px" }}
            >
              <i className="bi bi-person-fill"></i>
            </div>

            <div className="text-center text-sm-start flex-grow-1">
              <h4 className="fw-bold mb-1">{user.name}</h4>
              <p className="text-secondary mb-2">{user.email}</p>
              <span className="badge bg-success-subtle text-success">
                Admin
              </span>
            </div>

            <button
              className="btn btn-primary"
              disabled={submitted}
              onClick={handleSubmit}
            >
              <i className="bi bi-pencil-square me-2"></i>
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-3 p-md-4">
          <h5 className="fw-bold mb-4">Personal Information</h5>
          <form >
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label text-secondary">Full Name</label>
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
                <label className="form-label text-secondary">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-secondary">Role</label>
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
                <label className="form-label text-secondary">
                  Account Status
                </label>
                <input
                  type="text"
                  name="acount"
                  className="form-control"
                  value={formData.account}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
