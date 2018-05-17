import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn } from '../actions/actions';
import { firebase, googleAuthProvider } from '../firebase/firebase';

const LogIn = ({ loggedIn, logIn }) => {
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
      <button onClick={logIn}>Log In</button>
      <button onClick={() => {
        firebase.auth().signInWithPopup(googleAuthProvider).then(
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              console.log("you are logged in!");
              console.log('user info: ', firebase.UserInfo);
              firebase.database().ref('me').set({status: 'firebase update coz authed!'});
            }
          })
        );

      }}>{'Auth with Google PopUp'}</button>
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
