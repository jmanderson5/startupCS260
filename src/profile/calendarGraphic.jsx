import React from 'react';
import './calendarGraphic.css';

export function CalendarGraphic({ calendar }) {
  const eventLabels =
    calendar.labelProperties?.eventLabels || [];

  const conferenceTypes =
    calendar.conferenceProperties
      ?.allowedConferenceSolutionTypes || [];

  return (
    <section className="calendar-graphic">
      <div className="calendar-top">
        <div className="calendar-date-icon">
          <span className="calendar-icon-header">
            CAL
          </span>

          <span className="calendar-icon-day">
            {new Date().getDate()}
          </span>
        </div>

        <div className="calendar-heading">
          <p className="calendar-kind">
            {calendar.kind}
          </p>

          <h2>{calendar.summary}</h2>

          <p className="calendar-description">
            {calendar.description ||
              'No calendar description provided.'}
          </p>
        </div>
      </div>

      <div className="calendar-details">
        <div className="calendar-detail">
          <span className="detail-label">
            Calendar ID
          </span>

          <span className="detail-value">
            {calendar.id}
          </span>
        </div>

        <div className="calendar-detail">
          <span className="detail-label">
            Location
          </span>

          <span className="detail-value">
            {calendar.location ||
              'No location provided'}
          </span>
        </div>

        <div className="calendar-detail">
          <span className="detail-label">
            Time zone
          </span>

          <span className="detail-value">
            {calendar.timeZone}
          </span>
        </div>

        <div className="calendar-detail">
          <span className="detail-label">
            Data owner
          </span>

          <span className="detail-value">
            {calendar.dataOwner ||
              'No owner provided'}
          </span>
        </div>

        <div className="calendar-detail">
          <span className="detail-label">
            Auto-accept invitations
          </span>

          <span
            className={
              calendar.autoAcceptInvitations
                ? 'status-badge enabled'
                : 'status-badge disabled'
            }
          >
            {calendar.autoAcceptInvitations
              ? 'Enabled'
              : 'Disabled'}
          </span>
        </div>
      </div>

      <div className="calendar-section">
        <h3>Conference Options</h3>

        {conferenceTypes.length === 0 ? (
          <p>No conference options available.</p>
        ) : (
          <div className="conference-list">
            {conferenceTypes.map(
              (conferenceType) => (
                <span
                  className="conference-badge"
                  key={conferenceType}
                >
                  {formatConferenceName(
                    conferenceType
                  )}
                </span>
              )
            )}
          </div>
        )}
      </div>

      <div className="calendar-section">
        <h3>Event Labels</h3>

        {eventLabels.length === 0 ? (
          <p>No event labels available.</p>
        ) : (
          <div className="event-label-list">
            {eventLabels.map((label) => (
              <div
                className="event-label"
                key={label.id}
              >
                <span
                  className="event-label-color"
                  style={{
                    backgroundColor:
                      label.backgroundColor,
                  }}
                />

                <span>{label.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <details className="calendar-technical-details">
        <summary>Technical details</summary>

        <p>
          <strong>ETag:</strong>{' '}
          {calendar.etag}
        </p>
      </details>
    </section>
  );
}

function formatConferenceName(value) {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (letter) =>
      letter.toUpperCase()
    );
}