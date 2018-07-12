import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import moment from 'moment';
import NavbarContainer from '../containers/NavbarContainer';
import FriendsSearch from '../containers/FriendsSearch';
import FriendsListContainer from '../containers/FriendsListContainer';
import { deleteWishlistInStateAndDB } from '../actions/wishlists';
import { deleteEventInStateAndDB } from '../actions/events';

const MyDashboard = (props) => {
  const wishlistsToRender = props.wishlists.map((wishlist, index) => {
    return <p key={index} id={wishlist.id}>{wishlist.title}
      <Link to={{
          pathname: `/updateWishlist/${wishlist.id}`,
          state: {wishlistid: wishlist.id}
        }}>
        <button className="btn">{'Update'}</button>
      </Link>
      <button className="btn" onClick={() => props.deleteWishlistInStateAndDB(wishlist, 'wishlistDeletion')}>{'Delete'}</button>
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
          <button className="btn">{'Update'}</button>
        </Link>
      }
      <button className="btn" onClick={() => props.deleteEventInStateAndDB(ev, 'eventDeletion')}>{'Delete'}</button>
    </p>)
  });

  return (
    <div>
      <NavbarContainer />
      <div className="dashboardOutterContainer">
      <div className="dashboardInnerContainer">
        <h1>My Dashboard</h1>
        <div>
          <h2>My wishlists</h2>
          {wishlistsToRender}
          <h2>My Events</h2>
          {events}
        </div>
        <div>
          <FriendsSearch />
          {props.friends.length > 0 && (
            <div>
              <h3>Friends list</h3>
              <FriendsListContainer />
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    wishlists: state.wishlists,
    events: state.events,
    friends: state.friends,
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteEventInStateAndDB: (ev, operation) => dispatch(deleteEventInStateAndDB(ev, operation)),
  deleteWishlistInStateAndDB: (wishlist, operation) => dispatch(deleteWishlistInStateAndDB(wishlist, operation)),
})

MyDashboard.propTypes = {
  wishlists: PropTypes.arrayOf(PropTypes.object),
  events: PropTypes.arrayOf(PropTypes.object),
  friends: PropTypes.arrayOf(PropTypes.object),
  deleteEventInStateAndDB: PropTypes.func.isRequired,
  deleteWishlistInStateAndDB: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDashboard);
