import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import NavbarContainer from '../containers/NavbarContainer';
import Events from '../components/Events';
import { getPassedEvents, getFuturEvents } from '../selectors/events';
import { deleteEventInStateAndDB } from '../actions/events';

import moment from 'moment';

class EventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
  }
  setFetchedEventsInState (events) {
    this.setState({...this.state, events: events});
  }

  componentDidMount() {
    //fetch data from server and update wishlists local state.
    const userId = firebase.auth().currentUser.uid;
    const participationRef = firebase.database().ref(`users/${userId}/eventsParticipation`);
    let eventsIdsArray = [];
    let events = [];

    participationRef.once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const ref = firebase.database().ref(`events/${childSnapshot.key}`);
        ref.once('value')
        .then(snapshot => {
          events.push(snapshot.val());
        })
        .then(() => {
          this.setFetchedEventsInState(events);
        });
      });
    });

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
          deleteEventInStateAndDB={this.props.deleteEventInStateAndDB}
          eventsParticipation={this.state.events}
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
