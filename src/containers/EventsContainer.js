import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarContainer from '../containers/NavbarContainer';
import Events from '../components/Events';
import { getPassedEvents, getFuturEvents } from '../selectors/events';
import { updateEventsWishlistsLinksMatrix } from '../actions/eventsWishlistsLinks';
import { deleteEvent, startEventDeletion } from '../actions/events';

import moment from 'moment';

class EventsContainer extends React.Component {
  deleteEventAndUpdateMatrix = (ev, eventId) => {
    return new Promise ((resolve) => {
      this.props.deleteEvent(eventId)})
      .then(this.props.updateEventsWishlistsLinksMatrix('eventDeletion', eventId))
      .then(this.props.startEventDeletion(ev, eventId));
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

const mapDispatchToProps = (dispatch) => ({
  deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
  updateEventsWishlistsLinksMatrix: (operation, id, linksIds) => dispatch(updateEventsWishlistsLinksMatrix(operation, id, linksIds)),
  startEventDeletion: (ev, id) => dispatch(startEventDeletion(ev, id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
