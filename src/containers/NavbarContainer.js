import React from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { logOut, startLogout } from '../actions/actions';

const NavbarContainer = (props) => {
  return (
    <Navbar
      loggedIn={props.loggedIn}
      logOut={props.logOut}
      startLogout={props.startLogout}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = {
  logOut,
  startLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
