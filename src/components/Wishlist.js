import React from 'react';
import Navbar from './Navbar';

const Wishlist = (props) => (
    <div>
      <Navbar />
      <h1>Wishlist nr {props.match.params.id}!</h1>
    </div>
)

export default Wishlist;
