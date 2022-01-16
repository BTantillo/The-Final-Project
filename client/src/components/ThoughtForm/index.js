import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';
import {  QUERY_ME } from '../../utils/queries' 
import { QUERY_EVENTS } from '../../utils/queries' 

const ThoughtForm = () => {
    const [eventText, setText] = useState('')
    const [characterCount, setCharacterCount] = useState(0);
    const [addEvent, { error }] = useMutation(ADD_EVENT, {
        update(cache, { data: { addEvent } }) {
          try {
            // could potentially not exist yet, so wrap in a try...catch
            const { events } = cache.readQuery({ query: QUERY_EVENTS });
            cache.writeQuery({
              query: QUERY_EVENTS,
              data: { events: [addEvent, ...events] }
            });
          } catch (e) {
            console.error(e);
          }
      
          // update me object's cache, appending new event to the end of the array
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, events: [...me.events, addEvent] } }
          });
        }
      });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };

      const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add event to database
          await addEvent({
            variables: { eventText }
          });
      
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      }

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
            Character Count: {characterCount}/280
            {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit} >
            <textarea
            placeholder="Tell people what's happenin'..."
            value={eventText}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
                ></textarea>
                <button className="btn has-icons-right col-12 col-md-3" type="submit">
                  Submit
                  <span className="icon">
                  <i className="fas fa-check"></i>
                  </span>
                </button>
            </form>
        </div>
    )
}

export default ThoughtForm;