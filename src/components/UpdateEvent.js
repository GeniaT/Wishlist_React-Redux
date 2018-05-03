import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import EventForm from './EventForm';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveEvent, updateEventsWishlistsLinksMatrix } from '../actions/actions';

const UpdateEvent = (props) => {
  const eventObj = props.events.find(obj => obj.id === props.match.params.id);

  return props.loggedIn
  ? <div>
      <NavbarContainer />
      <h1>Update {eventObj.title } ev€nt!</h1>
      <EventForm
        onSaveEvent={(ev, operation, id, wishlistLinksIds) => {
          props.saveEvent(ev);
          props.updateEventsWishlistsLinksMatrix(operation, id, wishlistLinksIds);
          props.history.push('/my-events');

        }}
        eventToUpdate={eventObj}
      />
    </div>
  : <Redirect to='/'/>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    events: state.events
  }
}

const mapDispatchToProps = {
  saveEvent,
  updateEventsWishlistsLinksMatrix
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent);
