import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';

const Navbar = ({loggedIn}) => {
  return loggedIn
  ? <div>
      <NavLink to="/" exact={true} activeClassName="selected" className="link">Dashboard</NavLink>
      <NavLink to="/create-wishlist" activeClassName="selected" className="link">Create a wishlist</NavLink>
      <NavLink to="/my-events" activeClassName="selected" className="link">My Events</NavLink>
    </div>
  : <div>
      <NavLink to="/" exact={true} activeClassName="selected" className="link">Home</NavLink>
    </div>
}

const mapStateToProps = (state, props) => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(Navbar);
