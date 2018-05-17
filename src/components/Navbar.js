import React from 'react';
import { NavLink } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
const Navbar = ({loggedIn, logOut}) => {
  return loggedIn
  ? <div>
      <NavLink to="/" exact={true} activeClassName="selected" className="link">Dashboard</NavLink>
      <NavLink to="/create-wishlist" activeClassName="selected" className="link">Create a wishlist</NavLink>
      <NavLink to="/my-events" activeClassName="selected" className="link">My Events</NavLink>
      <button onClick={logOut}>Log Out</button>
      <button onClick={() => firebase.auth().signOut()}>Log out via firebase!</button>
      <button onClick={() => firebase.database().ref('me').set({status: 'check DB updated? after signing out?'})}>{'try to update the DB after signing out.'}</button>
    </div>
  : <div>
      <NavLink to="/" exact={true} activeClassName="selected" className="link">Home</NavLink>
    </div>
}

export default Navbar;
