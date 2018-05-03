import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';

const Wishlist = (props) => (
    <div>
      <NavbarContainer />
      <h1>Wishlist nr {props.match.params.id}!</h1>
    </div>
)

export default Wishlist;
