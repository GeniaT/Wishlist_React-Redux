import React from 'react';
import PropTypes from 'prop-types';
import NavbarContainer from '../containers/NavbarContainer';

const Wishlist = (props) => (
    <div>
      <NavbarContainer />
      <h1>Wishlist nr {props.match.params.id}!</h1>
    </div>
)

export default Wishlist;
