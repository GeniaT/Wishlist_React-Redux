import React from 'react';
import PropTypes from 'prop-types';
import NavbarContainer from '../containers/NavbarContainer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { startLoginWithGoogle, startLoginWithFacebook } from '../actions/user';

const LogIn = ({ loggedIn, startLoginWithGoogle, startLoginWithFacebook }) => {
  return loggedIn
  ? <Redirect push to='/'/>
  : <div>
      <NavbarContainer />
      <h1>Log In Page</h1>
      <button onClick={startLoginWithGoogle}>Log In With Google</button>
      <button onClick={startLoginWithFacebook}>Log In With Facebook</button>
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
