import React from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToWishlist } from './store';

// const Home = (props) => (
//     <div>
//       <Navbar />
//       <h1>Not logged in! You see the Home Page</h1>
//       <NavLink to="/SignIn" exact={true} className="link"><button>Sign In</button></NavLink>
//       <NavLink to="/LogIn" exact={true} className="link"><button>Log In</button></NavLink>
//     </div>
// )

const Home = (props) => {
  console.log(props);
  // const test = () => store.dispatch(addToWishlist("Pizza"));
  return (
    <div>
      <Navbar />
      <h1>Not logged in! You see the Home Page</h1>
      <NavLink to="/SignIn" exact={true} className="link"><button>Sign In</button></NavLink>
      <NavLink to="/LogIn" exact={true} className="link"><button>Log In</button></NavLink>
      <button onClick={() => {console.log(props); props.dispatch(addToWishlist("Pizza"))}}>TEST</button>
    </div>
  )
}



export default connect()(Home);
