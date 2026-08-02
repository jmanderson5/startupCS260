import React, { useEffect, useState } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { CalendarGraphic } from './calendarGraphic';

export function Profile() {
    const navigate = useNavigate();
    
    const [applications, setApplications] = useState([]);
    const [displayError, setDisplayError] = useState('');

    const [googleCalendarConnected, setGoogleCalendarConnected,] = useState(false);
    const [calendarEvents, setCalendarEvents] =useState([]);
    const [calendarError, setCalendarError] =useState('');

    useEffect(() => {
        async function checkCalendarConnection() {
            try {
            const response = await fetch(
                '/api/calendar/status',
                {
                credentials: 'include',
                }
            );

            if (!response.ok) {
                return;
            }

            const data = await response.json();

            setGoogleCalendarConnected(
                data.connected
            );
            } catch (error) {
            console.error(
                'Unable to check calendar connection:',
                error
            );
            }
        }

        checkCalendarConnection();
    }, []);

    useEffect(() => {
        if (!googleCalendarConnected) {
            return;
        }

        async function loadCalendarEvents() {
            try {
            const response = await fetch(
                '/api/calendar/events',
                {
                credentials: 'include',
                }
            );

            const body = await response.json();

            if (!response.ok) {
                throw new Error(
                body.msg ||
                    'Unable to retrieve calendar events'
                );
            }

            setCalendarEvents(body);
            } catch (error) {
            console.error(error);
            setCalendarError(error.message);
            }
        }

        loadCalendarEvents();
    }, [googleCalendarConnected]);

    useEffect(() => {
    async function loadApplications() {
      try {
        const response = await fetch(
          '/api/profile/applications'
        );

        if (!response.ok) {
            const errorBody = await response.json();

            throw new Error(
            errorBody.msg ||
                `Request failed: ${response.status}`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error(
            'Applications response was not an array'
            );
        }

        setApplications(data);
        } catch (error) {
            console.error(error);
            setDisplayError(error.message);
        }
    }

    loadApplications();
    }, []);

  const calendar = {
    kind: 'calendar#calendar',
    etag: '"internship-calendar-v1"',
    id: 'internship-calendar',
    summary: 'Internship Calendar',

    description:
        'Interviews, application deadlines, career fairs, and internship events.',

    location: 'Provo, Utah',
    timeZone: 'America/Denver',
    dataOwner: 'Benjamin Anderson',

    conferenceProperties: {
        allowedConferenceSolutionTypes: [
        'hangoutsMeet',
        'zoom',
        ],
    },

    labelProperties: {
        eventLabels: [
        {
            id: 'interview',
            backgroundColor: '#0d6efd',
            name: 'Interview',
        },
        {
            id: 'deadline',
            backgroundColor: '#dc3545',
            name: 'Deadline',
        },
        {
            id: 'career-fair',
            backgroundColor: '#198754',
            name: 'Career Fair',
        },
        ],
    },

    autoAcceptInvitations: false,
    };

    async function addApplication(application) {
        setDisplayError('');

        try {
            const response = await fetch(
            '/api/profile/applications',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(application),
            }
            );

            const body = await response.json();

            if (!response.ok) {
            throw new Error(
                body.msg || 'Unable to add application'
            );
            }

            setApplications((current) => [
            body,
            ...current,
            ]);
        } catch (error) {
            console.error(error);
            setDisplayError(error.message);
        }
    }

    async function removeApplication(applicationId) {
        setDisplayError('');

        try {
            const response = await fetch(
            `/api/profile/applications/${applicationId}`,
            {
                method: 'DELETE',
                credentials: 'include',
            }
            );

            if (!response.ok) {
            let message = 'Unable to remove application';

            try {
                const body = await response.json();
                message = body.msg || message;
            } catch {
                // The server may return an empty response.
            }

            throw new Error(message);
            }

            setApplications((current) =>
            current.filter(
                (application) =>
                application.id !== applicationId
            )
            );
        } catch (error) {
            console.error(error);
            setDisplayError(error.message);
        }
    }

  return (
    <main className="profile-page">
        <div className="content">
            <div>
                <h2 className="card-title profile-name">Benjamin Anderson</h2>
                <div className="card">
                    <div className="card-body">
                    <p className="card-text">Studying Computer Science at BYU</p>
                    <a onClick={() => navigate('/profile/edit')} className="btn btn-primary">Edit Profile</a>
                    </div>
                </div>
            </div>
            
            <section id="Applications" className="Applications">
                <h3>Applications</h3>

                {displayError && (
                    <div className="alert alert-danger" role="alert">
                        {displayError}
                    </div>
                )}

                <div className="accordion" id="applicationsAccordion">
                    {applications.map((application) => (
                    <div className="accordion-item" key={application.id}>
                        <h2
                        className="accordion-header"
                        id={`heading-${application.id}`}
                        >
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${application.id}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${application.id}`}
                        >
                            {application.company}
                        </button>
                        </h2>

                        <div
                        id={`collapse-${application.id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading-${application.id}`}
                        data-bs-parent="#applicationsAccordion"
                        >
                        <div className="accordion-body">
                            <div className="application_info">
                            <nav>
                                <a href="benjamin_generated_resume.jpg">
                                View Application
                                </a>

                                <a href="benjamin_generated_resume.jpg">
                                View Interview Notes
                                </a>
                            </nav>
                            <ul>
                                <li>Offer Status: {application.status}</li>
                                <li>Position: {application.position}</li>
                                <li>Applied: {application.dateApplied}</li>
                            </ul>
                            <p>Notes: {application.notes}</p>
                            </div>
                            <button
                                className="btn btn-success"
                                type="button"
                                onClick={() =>
                                    removeApplication(application.id)
                                }    
                            >
                                Remove Application
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </section>
        </div>

        <div className="content">
            <div id="profile-box">
                <form id="Connect" className="Connect" action="./chat.html" method="get">
                    <h3>Connect</h3>
                    <p>Connect with other users </p>
                    <button onClick={() => navigate('/chat')} type="button" 
                        className="btn btn-outline-info">Do It</button>
                </form>
            </div>  
            {!googleCalendarConnected && (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                    window.location.href =
                        '/api/calendar/oauth/start';
                    }}
                >
                    Connect Google Calendar
                </button>
            )}

            {calendarError && (
            <div
                className="alert alert-danger"
                role="alert"
            >
                {calendarError}
            </div>
            )}

            {googleCalendarConnected && (
            <section className="calendar-events">
                <h3>Upcoming Calendar Events</h3>

                {calendarEvents.length === 0 ? (
                    <p>No upcoming events found.</p>
                    ) : (
                    <div className="list-group">
                        {calendarEvents.map((event) => (
                        <article
                            className="list-group-item"
                            key={event.id}
                        >
                            <h5>{event.title}</h5>

                            <p>
                            {formatCalendarDate(
                                event.start
                            )}
                            </p>

                            {event.location && (
                            <p>
                                Location: {event.location}
                            </p>
                            )}

                            {event.link && (
                            <a
                                href={event.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open in Google Calendar
                            </a>
                            )}
                        </article>
                        ))}
                    </div>
                    )}
                </section>
            )}
        </div>
    </main>
  );
}

function formatCalendarDate(value) {
  if (!value) {
    return 'Date unavailable';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}