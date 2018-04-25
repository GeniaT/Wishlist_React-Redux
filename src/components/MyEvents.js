import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { passedEvents, futurEvents } from '../selectors/events';
import { deleteEvent } from '../actions/actions';
import moment from 'moment';

const MyEvents = ({loggedIn, events, deleteEvent }) => {
  return loggedIn
  ? <div>
      <Navbar />
      <h1>Check your Events here!</h1>
      {futurEvents(events).length > 0 &&
        <div>
        <h2>My futur events:</h2>
        {futurEvents(events).map((ev,index) =>
          <p key={index} id={ev.id}>{ev.title} - {moment(ev.date).format('YYYY MM DD')}
            <button onClick={() => {deleteEvent(ev.id)}}>Delete</button>
          </p>
      )}
      </div>}

      <Link to={`/create-event`}><button>{'Create a new Event'}</button></Link>
      {passedEvents(events).length > 0 &&
        <div>
        <h2>My passed events:</h2>
        {passedEvents(events).map((ev,index) =>
          <p key={index} id={ev.id}>{ev.title} - {moment(ev.date).format('YYYY MM DD')}
            <button onClick={() => {deleteEvent(ev.id)}}>Delete</button>
          </p>
      )}
      </div>}
    </div>
  : <Redirect push to='/'/>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    events: state.events
  }
}

const mapDispatchToProps = {
  deleteEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);
