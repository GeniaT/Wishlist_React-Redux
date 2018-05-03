import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import MyDashboard from './MyDashboard';

const Home = (props) => {
  return props.loggedIn
  ? <MyDashboard />
  : <div>
      <NavbarContainer />
      <h1>Not logged in! You see the Home Page</h1>
      <NavLink to="/SignIn" exact={true} className="link"><button>Sign In</button></NavLink>
      <NavLink to="/LogIn" exact={true} className="link"><button>Log In</button></NavLink>
    </div>
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

export default connect(mapStateToProps)(Home);
