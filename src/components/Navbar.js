import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/actions';

const Navbar = ({loggedIn, logOut}) => {
  return loggedIn
  ? <div>
      <NavLink to="/" exact={true} activeClassName="selected" className="link">Dashboard</NavLink>
      <NavLink to="/create-wishlist" activeClassName="selected" className="link">Create a wishlist</NavLink>
      <NavLink to="/my-events" activeClassName="selected" className="link">My Events</NavLink>
      <button onClick={logOut}>Log Out</button>
    </div>
  : <div>
      <NavLink to="/" exact={true} activeClassName="selected" className="link">Home</NavLink>
    </div>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = {
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
