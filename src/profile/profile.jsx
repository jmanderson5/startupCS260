import React, { useState } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { CalendarGraphic } from './calendarGraphic';

export function Profile() {
    const navigate = useNavigate();
    
    const [applications] = useState([
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer Intern',
      status: 'Applied',
      dateApplied: 'July 10, 2026',
      notes: 'Waiting for a response.',
    },
    {
      id: 2,
      company: 'Amazon',
      position: 'Software Development Engineer Intern',
      status: 'Interview',
      dateApplied: 'July 12, 2026',
      notes: 'Technical interview scheduled.',
    },
    {
      id: 3,
      company: 'Microsoft',
      position: 'Software Engineer Intern',
      status: 'Saved',
      dateApplied: 'Not submitted',
      notes: 'Finish cover letter before applying.',
    },
  ]);

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

  return (
    <main className="profile-page">
        <div className="content">
            <div className="card">
                <title>Profile Summary</title>
                <rect width="100%" height="100%" fill="#20c997"></rect>

                <div className="card-body">
                <h5 className="card-title">Benjamin Anderson</h5>
                <p className="card-text">Studying Computer Science at BYU</p>
                <a onClick={() => navigate('/profile/edit')} className="btn btn-primary" target="_blank">Edit Profile</a>
                </div>
            </div>
            
            <section id="Applications" className="Applications">
                <h3>Applications</h3>

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

                            <p>Offer Status: {application.status}</p>

                            <ul>
                                <li>Position: {application.position}</li>
                                <li>Applied: {application.dateApplied}</li>
                                <li>Notes: {application.notes}</li>
                            </ul>
                            </div>
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
                <section id="leetCode" className="github">
                    <h3>LeetCode</h3>
                    <p>View your LeetCode practice problems here</p>
                    <a href="https://leetcode.com/problemset/" type="button" 
                            className="btn btn-outline-info">Do It</a>
                </section>
            </div>    
            <section id="schedule" className="schedule">
                <section className="profile-calendar">
                    <h3>Calendar</h3>

                    <CalendarGraphic calendar={calendar} />
                </section>
            </section>
        </div>
    </main>
  );
}