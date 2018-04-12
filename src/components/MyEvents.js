import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const MyEvents = ({loggedIn}) => {
  return loggedIn
  ? <div>
      <Navbar />
      <h1>Check your Events here!</h1>
      <h2>My futur events:</h2>
      <ul>
        <li>{"Chrismas with friend - 25/12/2018"}</li>
        <li>{"Vi's Birthday - 16/03/2019"}</li>
        <li>{"Wedding Seb & Li - 03/06/2019"}</li>
      </ul>
      <Link to={`/create-event`}><button>{'Create a new Event'}</button></Link>
      <h2>My passed events:</h2>
      <ul>
        <li>{"Sister's birthday - 24/07/2017"}</li>
        <li>{"Gui's Birthday - 01/09/2016"}</li>
        <li>{"Steph's graduation - 02/03/2015"}</li>
      </ul>
    </div>
  : <Redirect push to='/'/>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(MyEvents);
