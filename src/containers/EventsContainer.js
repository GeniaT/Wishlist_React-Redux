import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import Events from '../Components/Events';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPassedEvents, getFuturEvents } from '../selectors/events';
import { deleteEvent, updateEventsWishlistsLinksMatrix } from '../actions/actions';
import moment from 'moment';

class EventsContainer extends React.Component {
  deleteEventAndUpdateMatrix = (eventId) => {
    return new Promise ((resolve) => {
      this.props.deleteEvent(eventId)
    }).then(this.props.updateEventsWishlistsLinksMatrix('eventDeletion', eventId));
  }

  render() {
    const futurEvents = getFuturEvents(this.props.events);
    const passedEvents = getPassedEvents(this.props.events);

    return this.props.loggedIn
    ? <div>
        <NavbarContainer />
        <Events
          futurEvents={futurEvents}
          passedEvents={passedEvents}
          deleteEventAndUpdateMatrix={this.deleteEventAndUpdateMatrix}
        />
      </div>
    : <Redirect push to='/'/>
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
