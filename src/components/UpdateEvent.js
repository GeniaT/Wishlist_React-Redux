import React from 'react';
import Navbar from './Navbar';
import EventForm from './EventForm';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveEvent } from '../actions/actions';
import store from '../store/store';


const UpdateEvent = (props) => {
  const state = store.getState();
  const eventObj = state.events.find(obj => obj.id === props.match.params.id);

  return props.loggedIn
  ? <div>
      <Navbar />
      <h1>Update {eventObj.title } ev€nt!</h1>
      <EventForm
        onSaveEvent={(ev) => {
          props.saveEvent(ev);
          props.history.push('/my-events');
        }}
        eventToUpdate={eventObj}
      />
    </div>
  : <Redirect to='/'/>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = {
  saveEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent);
