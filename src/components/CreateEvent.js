import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveEvent } from '../actions/actions';
import EventForm from './EventForm';


const CreateEvent = (props) => {
  return props.loggedIn
  ? <div>
      <Navbar />
      <h1>{'Create your Event!'}</h1>
      <EventForm onSaveEvent={(ev) => {
        props.saveEvent(ev);
        props.history.push('/my-events');
        }}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
