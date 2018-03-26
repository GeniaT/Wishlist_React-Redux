import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <div>
    <NavLink to="/" exact={true} activeClassName="selected" className="link">Home</NavLink>
    <NavLink to="/create-wishlist" activeClassName="selected" className="link">Create a wishlist</NavLink>
    <NavLink to="/my-events" activeClassName="selected" className="link">My Events</NavLink>
  </div>
)


export default Navbar;
