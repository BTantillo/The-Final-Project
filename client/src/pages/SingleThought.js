import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_EVENT } from '../utils/queries'
import ReactionList from '../components/ReactionList'
import ReactionForm from '../components/ReactionForm'
import Auth from '../utils/auth'

const SingleEvent = props => {
  const { id: eventId } = useParams();

  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: { id: eventId }
  })

  const event = data?.event || {};

  if(loading) {
    return <div>Loading...</div>
  }
  console.log(eventId);
  console.log(event)
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }}>
            {event.username}
          </span>{' '}
          event on {event.createdAt}
        </p>
        <div className="card-body"  id="eventCardBody">
          <p>{event.eventText}</p>
        </div>
      </div>
      {event.reactionCount > 0 && <ReactionList reactions={event.reactions} />}
      {Auth.loggedIn() && <ReactionForm eventId={event._id} />}
    </div>
  );
};

export default SingleEvent;
