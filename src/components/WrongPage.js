import React from 'react';
import { NavLink } from 'react-router-dom';
const WrongPage = () => (
  <div>
    <h1>404 - Sorry, wrong destination !</h1>
    <NavLink to="/" exact={true} activeClassName="selected" className="link">Return to Home page</NavLink>
  </div>
)

export default WrongPage;
