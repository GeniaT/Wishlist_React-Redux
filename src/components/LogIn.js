import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn } from '../actions/actions';
import store from './store';


const LogIn = (props, {loggedIn}) => {
  if (store.getState().loggedIn) {
    return <Redirect to='/'/>
  } else {
    return (
      <div>
        <Navbar />
        <h1>Log In Page</h1>
        <form>
        <input
            type="text"
            placeholder="Name"
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
          />
        </form>
        <button onClick={() => props.dispatch(logIn())}>Log In</button>
      </div>
    )
  }
}
const mapStateToProps = (state, props) => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(LogIn);
