import React from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToWishlist } from '../actions/actions';
import MyDashboard from './MyDashboard';

const Home = ({loggedIn, addToWishlist}) => {
  return loggedIn
  ? <MyDashboard />
  : <div>
      <Navbar />
      <h1>Not logged in! You see the Home Page</h1>
      <NavLink to="/SignIn" exact={true} className="link"><button>Sign In</button></NavLink>
      <NavLink to="/LogIn" exact={true} className="link"><button>Log In</button></NavLink>
      <button onClick={() => {addToWishlist("LOL")}}>Add an Item as test</button>
    </div>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = {
  addToWishlist
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
