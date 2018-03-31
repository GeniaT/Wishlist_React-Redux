import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn } from '../actions/actions';
import store from './store';


const LogIn = ({ loggedIn, logIn }) => {
  return loggedIn
  ? <Redirect to='/'/>
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
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = {
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
