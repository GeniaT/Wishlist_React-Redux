import React from 'react';
import { connect } from 'react-redux';
import NavbarContainer from '../containers/NavbarContainer';
import { Link } from "react-router-dom";
import moment from 'moment';
import { deleteWishlist, deleteEvent, updateEventsWishlistsLinksMatrix } from '../actions/actions';

const MyDashboard = (props) => {
  const wishlistsToRender = props.wishlists.map((x, index) => {
    return <p key={index} id={x.id}>{x.title}
      <button onClick={() => new Promise((resolve) => {
        props.deleteWishlist(x.id)})
      .then(props.updateEventsWishlistsLinksMatrix('wishlistDeletion', x.id))}>Delete</button>
      <Link to={{
        pathname: `/updateWishlist/${x.id}`,
        state: {wishlistid: x.id}
      }} ><button>{'Update this Wishlist'}</button></Link>
    </p>
  });
  const now = moment();
  const events = props.events.map((ev, index) => {
    return (
    <p key={index} id={ev.id}>
      {ev.title} {moment(ev.date).format('YYYY-MM-DD')}
      <button onClick={() => new Promise((resolve) => {
        props.deleteEvent(ev.id)
      })
      .then(props.updateEventsWishlistsLinksMatrix('eventDeletion', ev.id)).then(console.log(ev.date))}>Delete</button>
      {moment(ev.date).isSameOrAfter(now) &&
        <Link to={{
          pathname: `/updateEvent/${ev.id}`,
          state: {eventid: ev.id}
        }}>
          <button>{'Update this Event'}</button>
        </Link>
      }
    </p>)
  });

  return (
    <div>
      <NavbarContainer />
      <h1>My Dashboard</h1>
      <div>
        <h2>My wishlists</h2>
        {wishlistsToRender}
        <h2>My Events</h2>
        {events}
      </div>
      <div>
        <h2>Social</h2>
        <h3>Followers</h3>
        <p>43</p>
        <h3>Following</h3>
        <p>13</p>
        <h2>Feed</h2>
        <p>Kevin has updated his xxx list</p>
        <p>Steph has updated her xxx list</p>
        <p>Event xxx is tomorrow!</p>
        <h2>Next Events</h2>
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
    wishlists: state.wishlists,
    events: state.events
  }
}

const mapDispatchToProps = {
  deleteWishlist,
  deleteEvent,
  updateEventsWishlistsLinksMatrix
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDashboard);
