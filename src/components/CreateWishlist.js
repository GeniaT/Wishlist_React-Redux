import React from 'react';
import Navbar from './Navbar';
import WishlistForm from './WishlistForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveWishlist, updateEventsWishlistsLinksMatrix } from '../actions/actions';


const CreateWishlist = (props) => {
  return props.loggedIn
  ? <div>
      <Navbar />
      <h1>Create your wishlist!</h1>
      <WishlistForm onSaveWishlist={(wishlist, operation, id, eventLinksIds) => {
        props.saveWishlist(wishlist);
        props.updateEventsWishlistsLinksMatrix(operation, id, eventLinksIds);
        props.history.push('/');
        }}
      />
    </div>
  : <Redirect to='/'/>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = {
  saveWishlist,
  updateEventsWishlistsLinksMatrix
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWishlist);
