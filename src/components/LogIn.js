import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { startLogin } from '../actions/actions';
import { firebase, googleAuthProvider, userId } from '../firebase/firebase';

const LogIn = ({ loggedIn, startLogin }) => {
  return loggedIn
  ? <Redirect push to='/'/>
  : <div>
      <NavbarContainer />
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
      <button onClick={startLogin}>Log In</button>
    </div>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = {
  startLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
