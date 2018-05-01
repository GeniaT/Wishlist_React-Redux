import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn } from '../actions/actions';

const LogIn = ({ loggedIn, logIn }) => {
  return loggedIn
  ? <Redirect push to='/'/>
  : <div>
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
      <button onClick={logIn}>Log In</button>
    </div>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = {
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
