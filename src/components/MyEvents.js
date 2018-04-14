import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const MyEvents = ({loggedIn, events}) => {
  const now = moment();
  const passedEvents = events.filter((ev) => {
    return moment(ev.date).isBefore(now);
  });
  const futurEvents = events.filter((ev) => {
    return now.isBefore(ev.date);
  });

  return loggedIn
  ? <div>
      <Navbar />
      <h1>Check your Events here!</h1>
      {futurEvents.length > 0 &&
        <div>
        <h2>My futur events:</h2>
        {futurEvents.map((ev,index) =>
          <p key={index}>{ev.title} - {moment(ev.date).format('YYYY MM DD')}</p>
      )}
      </div>}

      <Link to={`/create-event`}><button>{'Create a new Event'}</button></Link>
      {passedEvents.length > 0 &&
        <div>
        <h2>My passed events:</h2>
        {passedEvents.map((ev,index) =>
          <p key={index}>{ev.title} - {moment(ev.date).format('YYYY MM DD')}</p>
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

export default connect(mapStateToProps)(MyEvents);
