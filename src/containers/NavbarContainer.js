import React from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { logOut } from '../actions/actions';

const NavbarContainer = (props) => {
  return (
    <Navbar
      loggedIn={props.loggedIn}
      logOut={props.logOut}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = {
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
