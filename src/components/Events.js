import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Events = ({futurEvents, passedEvents, deleteEventInStateAndDB}) => {
  return (
    <div>
      <h1>Check your Events here!</h1>
      {futurEvents.length > 0 &&
        <div>
          <h2>My futur events:</h2>
          {futurEvents.map((ev,index) =>
            <p key={index} id={ev.id}> {ev.title} - {moment(ev.date).format('YYYY MM DD')}
              <Link to={{
                  pathname: `/updateEvent/${ev.id}`,
                  state: {eventid: ev.id}
                }}>
                <button>{'Update this Event'}</button>
              </Link>
              <button onClick={() => deleteEventInStateAndDB(ev, 'eventDeletion')}>{'Delete'}</button>
            </p>)}
        </div>}

      <Link to={`/create-event`}><button>{'Create a new Event'}</button></Link>
      {passedEvents.length > 0 && <div>
        <h2>My passed events:</h2>
        {passedEvents.map((ev,index) =>
          <p key={index} id={ev.id}>{ev.title} - {moment(ev.date).format('YYYY MM DD')}
            <button onClick={() => deleteEventInStateAndDB(ev, 'eventDeletion')}>{'Delete'}</button>
          </p> )}
      </div>}
    </div>
  )
}

export default Events;
