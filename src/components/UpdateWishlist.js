import React from 'react';
import Navbar from './Navbar';
import WishlistForm from './WishlistForm';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveWishlist, updateEventsWishlistsLinksMatrix } from '../actions/actions';
import store from '../store/store';


const UpdateWishlist = (props) => {
  const state = store.getState();
  const wishlistObj = state.wishlists.find(obj => obj.id === props.match.params.id);

  return props.loggedIn
  ? <div>
      <Navbar />
      <h1>Update {wishlistObj.title } wishlist!</h1>
      <WishlistForm
        onSaveWishlist={(wishlist, operation, id, eventLinksIds) => {
          props.saveWishlist(wishlist);
          props.updateEventsWishlistsLinksMatrix(operation, id, eventLinksIds);
          props.history.push('/');
        }}
        wishlistToUpdate={wishlistObj}
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWishlist);
