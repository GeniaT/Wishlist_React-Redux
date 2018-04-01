import React from 'react';
import Navbar from './Navbar';
import WishlistForm from './WishlistForm';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



const CreateWishlist = ({loggedIn}) => {
  return loggedIn
  ? <div>
      <Navbar />
      <h1>Create your wishlist!</h1>
      <WishlistForm />
    </div>
  : <Redirect to='/'/>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = {
  //
}

export default connect(mapStateToProps)(CreateWishlist);
