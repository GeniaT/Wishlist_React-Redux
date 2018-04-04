import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { Link } from "react-router-dom";

const MyDashboard = (props) => {
  const wishlists = props.wishlists.map((x, index) => {
    return <p key={index}>{x.title} <Link to={`/updateWishlist/${x.id}`}><button>{'Update this Wishlist'}</button></Link></p>
  });


  return (
    <div>
      <Navbar />
      <h1>My Dashboard</h1>
      <div>
        <h2>My wishlists</h2>
        {wishlists}
      </div>
      <div>
      <h2>Suggestions for me</h2>
        <h3>Books</h3>
        <ul>
          <li>{"Don't dream too big by xxx"}</li>
          <li>{"12 shades of Purple by xxx"}</li>
          <li>{"123 habits of ineffective people by xxx"}</li>
        </ul>
        <h3>Video Games</h3>
        <ul>
          <li>{"GTA VII"}</li>
          <li>{"Grand Tourismo 9"}</li>
          <li>{"Zelda - Ocarina of time II"}</li>
        </ul>
      </div>
      <div>
        <h2>Social</h2>
        <h3>Followers</h3>
        <p>43</p>
        <h3>Following</h3>
        <p>13</p>
        <h3>Feed</h3>
        <p>Kevin has updated his xxx list</p>
        <p>Steph has updated her xxx list</p>
        <p>Event xxx is tomorrow!</p>
        <h3>Next Events</h3>
        <ul>
          <li>{"Chrismas with friend - 25/12/2018"}</li>
          <li>{"Vi's Birthday - 16/03/2019"}</li>
          <li>{"Wedding Seb & Li - 03/06/2019"}</li>
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    wishlists: state.wishlists
  }
}

export default connect(mapStateToProps)(MyDashboard);
