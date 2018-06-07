import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import MyDashboard from './MyDashboard';
import LogIn from './LogIn';

const Home = (props) => {
  return props.loggedIn ? <MyDashboard /> : <LogIn />
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

export default connect(mapStateToProps)(Home);
