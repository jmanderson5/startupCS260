import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

export function EditProfile({
  profile,
  onProfileChange,
}) {
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    name: profile?.name || '',
    headline: profile?.headline || '',
  });

  const [applicationForm, setApplicationForm] =
    useState({
      company: '',
      position: '',
      status: 'Saved',
      dateApplied: '',
      notes: '',
    });

  const [displayError, setDisplayError] =
    useState('');

  const [displayMessage, setDisplayMessage] =
    useState('');

  function handleProfileChange(event) {
    const { name, value } = event.target;

    setProfileForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleApplicationChange(event) {
    const { name, value } = event.target;

    setApplicationForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleProfileSubmit(event) {
    event.preventDefault();

    onProfileChange(profileForm);
    navigate('/profile');
  }

  async function handleApplicationSubmit(event) {
    event.preventDefault();

    setDisplayError('');
    setDisplayMessage('');

    try {
      const response = await fetch(
        '/api/profile/applications',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationForm),
        }
      );

      const body = await response.json();

      if (!response.ok) {
        throw new Error(
          body.msg || 'Unable to add application'
        );
      }

      setDisplayMessage(
        `${body.company} was added successfully.`
      );

      setApplicationForm({
        company: '',
        position: '',
        status: 'Saved',
        dateApplied: '',
        notes: '',
      });
    } catch (error) {
      console.error(error);
      setDisplayError(error.message);
    }
  }

  return (
    <main className="profile-page">
      <div className="content-edit-page">
        <section className="card edit-profile-card">
          <div className="card-header">
            <h2>Edit Profile</h2>
          </div>

          <div className="card-body">
            <form onSubmit={handleProfileSubmit}>
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="profile-name"
                >
                  Name
                </label>

                <input
                  className="form-control"
                  id="profile-name"
                  name="name"
                  type="text"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="profile-headline"
                >
                  Profile description
                </label>

                <textarea
                  className="form-control"
                  id="profile-headline"
                  name="headline"
                  rows="3"
                  value={profileForm.headline}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <button
                className="btn btn-primary"
                type="submit"
              >
                Save Changes
              </button>
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
            {displayError && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {displayError}
              </div>
            )}

            {displayMessage && (
              <div
                className="alert alert-success"
                role="status"
              >
                {displayMessage}
              </div>
            )}

            <form onSubmit={handleApplicationSubmit}>
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="company"
                >
                  Company
                </label>

                <input
                  className="form-control"
                  id="company"
                  name="company"
                  type="text"
                  value={applicationForm.company}
                  onChange={handleApplicationChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="position"
                >
                  Position
                </label>

                <input
                  className="form-control"
                  id="position"
                  name="position"
                  type="text"
                  value={applicationForm.position}
                  onChange={handleApplicationChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="status"
                >
                  Status
                </label>

                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={applicationForm.status}
                  onChange={handleApplicationChange}
                >
                  <option value="Saved">Saved</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">
                    Interview
                  </option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">
                    Rejected
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="dateApplied"
                >
                  Date Applied
                </label>

                <input
                  className="form-control"
                  id="dateApplied"
                  name="dateApplied"
                  type="date"
                  value={applicationForm.dateApplied}
                  onChange={handleApplicationChange}
                />
              </div>

              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="notes"
                >
                  Notes
                </label>

                <textarea
                  className="form-control"
                  id="notes"
                  name="notes"
                  rows="3"
                  value={applicationForm.notes}
                  onChange={handleApplicationChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Add Application
              </button>
            </form>
          </div>
        </section>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => navigate('/profile')}
        >
          Back to Profile
        </button>
      </div>
    </main>
  );
}