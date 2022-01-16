import React from 'react';
import { Link } from 'react-router-dom'

const ThoughtList = ({ events, title }) => {
  if (!events.length) {
    return <h3>No Events Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {events &&
        events.map(event => (
          <div key={event._id} className="card mb-3">
            <p className="card-header">
              <Link
              to={`/profile/${event.username}`}
              style={{ fontWeight: 700 }}
              className="text-light"
              >
              {event.username}
              </Link>{' '}
              event on {event.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/event/${event._id}`}>
              <p>{event.eventText}</p>
              <p className="mb-0">
                Reactions: {event.reactionCount} || Click to{' '}
                {event.reactionCount ? 'see' : 'start'} the discussion!
              </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;