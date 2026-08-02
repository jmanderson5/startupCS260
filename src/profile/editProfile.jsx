import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

export function EditProfile({
  profile,
  onProfileChange,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ...profile,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onProfileChange(formData);
    navigate('/profile');
  }

  return (
    <main className="profile-page">
      <div className="content-edit-page">
      <section className="card edit-profile-card">
        <div className="card-header">
          <h2>Edit Profile</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="name"
              >
                Name
              </label>

              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="headline"
              >
                Profile description
              </label>

              <textarea
                className="form-control"
                id="headline"
                name="headline"
                rows="3"
                value={formData.headline}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
      </div>

      <div className="content-edit-page">
      <section className="card edit-profile-card">
        <div className="card-header">
          <h2>Add Application</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="name"
              >
                Company
              </label>

              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="name"
              >
                Position
              </label>

              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="name"
              >
                Status
              </label>

              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="name"
              >
                Date Applied
              </label>

              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="headline"
              >
                Profile description
              </label>

              <textarea
                className="form-control"
                id="headline"
                name="headline"
                rows="3"
                value={formData.headline}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </section>
      <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate('/profile')}
              >
                Cancel
              </button>
      </div>
    </main>
  );
}