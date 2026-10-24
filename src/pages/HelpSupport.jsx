
import { useState } from "react";
import { useAuth } from "./context/AuthContext";

function HelpSupport() {
  const { user} = useAuth();
  const [form, setForm] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setSubmitted(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    setForm({
      name: "",
      subject: "",
      message: "",
    });
  }

  return (
    <div className="container-fluid p-3 p-md-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Help & Support</h2>
        <p className="text-secondary mb-0">
          Need help? We're here to assist you.
        </p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 d-flex gap-3">
              <div className="fs-3 text-primary">
                <i className="bi bi-envelope"></i>
              </div>
              <div>
                <h6 className="fw-bold">Email Support</h6>
                <p className="text-secondary mb-0">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 d-flex gap-3">
              <div className="fs-3 text-success">
                <i className="bi bi-telephone"></i>
              </div>
              <div>
                <h6 className="fw-bold">Call Support</h6>
                <p className="text-secondary mb-0">
                  +91 98765 43210
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-3 p-md-4">
          <h5 className="fw-bold mb-1">Send us a message</h5>
          <p className="text-secondary mb-4">
            Describe your issue and we'll help you.
          </p>

          {submitted && (
            <div className="alert alert-success">
              Your message has been submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="What do you need help with?"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                rows="5"
                placeholder="Describe your issue..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary px-4">
              <i className="bi bi-send me-2"></i>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;
