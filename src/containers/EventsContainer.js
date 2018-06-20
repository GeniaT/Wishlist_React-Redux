import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarContainer from '../containers/NavbarContainer';
import Events from '../components/Events';
import { getPassedEvents, getFuturEvents } from '../selectors/events';
import { deleteEventInStateAndDB } from '../actions/events';

import moment from 'moment';

class EventsContainer extends React.Component {
  render() {
    const futurEvents = getFuturEvents(this.props.events);
    const passedEvents = getPassedEvents(this.props.events);

    return this.props.loggedIn
    ? <div>
        <NavbarContainer />
        <Events
          futurEvents={futurEvents}
          passedEvents={passedEvents}
          deleteEventInStateAndDB={this.props.deleteEventInStateAndDB}
          eventsParticipation={this.props.eventsParticipation}
        />
      </div>
    : <Redirect push to='/'/>
  }

}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    events: state.events,
    eventsParticipation: state.eventsParticipation,
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteEventInStateAndDB: (ev, operation) => dispatch(deleteEventInStateAndDB(ev, operation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
