import React from 'react';
import { NavLink } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import store from '../store/store';

const Navbar = ({loggedIn, logOut, startLogout }) => {
  return loggedIn
  ? <div>
      <NavLink to="/" exact={true} activeClassName="selected" className="link">Dashboard</NavLink>
      <NavLink to="/create-wishlist" activeClassName="selected" className="link">Create a wishlist</NavLink>
      <NavLink to="/my-events" activeClassName="selected" className="link">My Events</NavLink>
      <button onClick={() => store.dispatch(startLogout)}>Log Out</button>
    </div>
  : <div>
      <NavLink to="/" exact={true} activeClassName="selected" className="link">Home</NavLink>
    </div>
}

export default Navbar;
