import React from 'react';
import PropTypes from 'prop-types';
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

Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(Home);
