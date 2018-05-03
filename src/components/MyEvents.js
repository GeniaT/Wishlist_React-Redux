import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPassedEvents, getFuturEvents } from '../selectors/events';
import { deleteEvent, updateEventsWishlistsLinksMatrix } from '../actions/actions';
import moment from 'moment';

const MyEvents = ({loggedIn, events, deleteEvent, updateEventsWishlistsLinksMatrix }) => {
  return loggedIn
  ? <div>
      <NavbarContainer />
      <h1>Check your Events here!</h1>
      {getFuturEvents(events).length > 0 &&
        <div>
        <h2>My futur events:</h2>
        {getFuturEvents(events).map((ev,index) =>
          <p key={index} id={ev.id}>{ev.title} - {moment(ev.date).format('YYYY MM DD')}
            <button onClick={() => new Promise ((resolve) => {
              deleteEvent(ev.id)
            }).then(updateEventsWishlistsLinksMatrix('eventDeletion', ev.id))}>Delete</button>
            <Link to={`/updateEvent/${ev.id}`}>
              <button>{'Update this Event'}</button>
            </Link>
          </p>
      )}
      </div>}

      <Link to={`/create-event`}><button>{'Create a new Event'}</button></Link>
      {getPassedEvents(events).length > 0 &&
        <div>
        <h2>My passed events:</h2>
        {getPassedEvents(events).map((ev,index) =>
          <p key={index} id={ev.id}>{ev.title} - {moment(ev.date).format('YYYY MM DD')}
            <button onClick={() => new Promise ((resolve) => {
              deleteEvent(ev.id)
            }).then(updateEventsWishlistsLinksMatrix('eventDeletion', ev.id))}>Delete</button>
          </p>
      )}
      </div>}
    </div>
  : <Redirect push to='/'/>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    events: state.events
  }
}

const mapDispatchToProps = {
  deleteEvent,
  updateEventsWishlistsLinksMatrix
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);
