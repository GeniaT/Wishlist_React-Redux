import React from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToWishlist } from '../actions/actions';
import MyDashboard from './MyDashboard';
import store from './store';

const Home = ({loggedIn}) => {
  return loggedIn
  ? <MyDashboard />
  : <div>
      <Navbar />
      <h1>Not logged in! You see the Home Page</h1>
      <NavLink to="/SignIn" exact={true} className="link"><button>Sign In</button></NavLink>
      <NavLink to="/LogIn" exact={true} className="link"><button>Log In</button></NavLink>
      <button onClick={() => {props.dispatch(addToWishlist("Pizza"))}}>TEST</button>
    </div>
}

const mapStateToProps = (state, props) => {
  return {
    loggedIn: state.loggedIn
  }
}


export default connect(mapStateToProps)(Home);
