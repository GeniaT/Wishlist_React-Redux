import React from 'react';
import PropTypes from 'prop-types';
import NavbarContainer from '../containers/NavbarContainer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { startLoginWithGoogle, startLoginWithFacebook } from '../actions/user';

const LogIn = ({ loggedIn, startLoginWithGoogle, startLoginWithFacebook }) => {
  return loggedIn
  ? <Redirect push to='/'/>
  : <div className="logInMainContainer">
      <NavbarContainer />
      <div className="header">
        <h1>Welcome to Wishlists!</h1>
        <p>Stop to unwanted items and imagination about an ideal gift.</p>
        <p>Choose the gift that will please from a wishlist and also receive what you really want!</p>
      </div>
      <button className="loginBtn loginBtn--google" onClick={startLoginWithGoogle}>Log In With Google</button>
      <button className="loginBtn loginBtn--facebook" onClick={startLoginWithFacebook}>Log In With Facebook</button>
    </div>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = {
  startLoginWithGoogle,
  startLoginWithFacebook
}

LogIn.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  startLoginWithGoogle: PropTypes.func.isRequired,
  startLoginWithFacebook: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
