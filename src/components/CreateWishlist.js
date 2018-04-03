import React from 'react';
import Navbar from './Navbar';
import WishlistForm from './WishlistForm';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveWishlist } from '../actions/actions';


const CreateWishlist = (props) => {
  return props.loggedIn
  ? <div>
      <Navbar />
      <h1>Create your wishlist!</h1>
      <WishlistForm onSaveWishlist={(wishlist) => {
        props.saveWishlist(wishlist);
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
  saveWishlist
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWishlist);
