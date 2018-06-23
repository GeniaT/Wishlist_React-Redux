import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarContainer from '../containers/NavbarContainer';
import Wishlist from '../components/Wishlist';

class WishlistContainer extends React.Component {
  render() {
    return this.props.loggedIn
    ? <div>
        <NavbarContainer />
        <Wishlist />
      </div>
    : <Redirect push to='/'/>
  }

}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   deleteEventInStateAndDB: (ev, operation) => dispatch(deleteEventInStateAndDB(ev, operation)),
// })

export default connect(mapStateToProps)(WishlistContainer);
