import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import moment from 'moment';
import NavbarContainer from '../containers/NavbarContainer';
import FriendsSearch from '../containers/FriendsSearch';
import { deleteWishlistInStateAndDB } from '../actions/wishlists';
import { deleteEventInStateAndDB } from '../actions/events';

const MyDashboard = (props) => {
  const wishlistsToRender = props.wishlists.map((wishlist, index) => {
    return <p key={index} id={wishlist.id}>{wishlist.title}
      <Link to={{
          pathname: `/updateWishlist/${wishlist.id}`,
          state: {wishlistid: wishlist.id}
        }}>
        <button>{'Update this Wishlist'}</button>
      </Link>
      <button onClick={() => props.deleteWishlistInStateAndDB(wishlist, 'wishlistDeletion')}>{'Delete'}</button>
    </p>
  });
  const now = moment();
  const events = props.events.map((ev, index) => {
    return (
    <p key={index} id={ev.id}>
      {ev.title} {moment(ev.date).format('YYYY-MM-DD')}
      {moment(ev.date).isSameOrAfter(now, 'day') &&
        <Link to={{
          pathname: `/updateEvent/${ev.id}`,
          state: {eventid: ev.id}
        }}>
          <button>{'Update this Event'}</button>
        </Link>
      }
      <button onClick={() => props.deleteEventInStateAndDB(ev, 'eventDeletion')}>{'Delete'}</button>
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
        <FriendsSearch />
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

const mapDispatchToProps = (dispatch) => ({
  deleteEventInStateAndDB: (ev, operation) => dispatch(deleteEventInStateAndDB(ev, operation)),
  deleteWishlistInStateAndDB: (wishlist, operation) => dispatch(deleteWishlistInStateAndDB(wishlist, operation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDashboard);
