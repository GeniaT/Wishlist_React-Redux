import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Events = ({futurEvents, passedEvents, deleteEventInStateAndDB, eventsParticipation}) => {
  return (
    <div className="eventsOutterContainer">
    <div className="eventsInnerContainer">
      <h1>{'Events Summary'}</h1>
      {futurEvents.length > 0 &&
        <div>
          <h2>My futur events:</h2>
          {futurEvents.map((ev,index) =>
            <p key={index} id={ev.id}> {ev.title} - {moment(ev.date).format('YYYY MM DD')}
              <Link to={{
                  pathname: `/updateEvent/${ev.id}`,
                  state: {eventid: ev.id}
                }}>
                <button className="btn">{'Update'}</button>
              </Link>
              <button className="btn" onClick={() => deleteEventInStateAndDB(ev, 'eventDeletion')}>{'Delete'}</button>
            </p>)}
        </div>}

      <Link to={`/create-event`}><button className="btn" id="btnCreateEvent">{'Create a new Event'}</button></Link>
      {passedEvents.length > 0 && <div>
        <h2>My passed events:</h2>
        {passedEvents.map((ev,index) =>
          <p key={index} id={ev.id}>{ev.title} - {moment(ev.date).format('YYYY MM DD')}
            <button className="btn" onClick={() => deleteEventInStateAndDB(ev, 'eventDeletion')}>{'Delete'}</button>
          </p> )}
      </div>}
      {eventsParticipation.length > 0 &&
        <div>
          <h1>{'My events invitations'}</h1>
          <ul>
            {eventsParticipation.map((ev, index) => <li key={index}><Link
            to={{pathname: `/displayEvent/${ev.id}`,
            state: {
              'event': ev
            }}}>
              <p>{ev.title}</p>
            </Link></li>)}
          </ul>
        </div>
      }
    </div>
    </div>
  )
}

Events.propTypes = {
  futurEvents: PropTypes.arrayOf(PropTypes.object),
  passedEvents: PropTypes.arrayOf(PropTypes.object),
  deleteEventInStateAndDB: PropTypes.func.isRequired,
  eventsParticipation: PropTypes.array,
}

export default Events;
