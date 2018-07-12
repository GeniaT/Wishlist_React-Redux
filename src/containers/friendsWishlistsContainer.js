import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import NavbarContainer from './NavbarContainer';

class friendsWishlistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlists: [],
      friendId: props.location.state.friendId,
    }
  }

  setFetchedWishlistsInState (wishlists) {
    this.setState({...this.state, wishlists: wishlists});
  }

  componentDidMount() {
    //fetch data from server and update wishlists local state.
    const friendId = this.state.friendId;
    const friendRef = firebase.database().ref(`users/${friendId}/wishlistsIds`);
    let wishlistsIdsArray = [];
    let wishlists = [];

    friendRef.once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const ref = firebase.database().ref(`wishlists/${childSnapshot.key}`);
        ref.once('value')
        .then(snapshot => {
          wishlists.push(snapshot.val());
        })
        .then(() => {
          this.setFetchedWishlistsInState(wishlists);
        });
      });
    })
  }

  render() {
    return this.props.loggedIn ? <div>
        <NavbarContainer />
        <div className="friendsWishlistsOutterContainer">
        <h1>{"My friend's wishlists"}</h1>
        {this.state.wishlists.length > 0 &&
          <div className="friendsWishlistsInnerContainer">
            {this.state.wishlists.map((wishlist, index) => <div key={index} className="friendWishlist"><Link
              to={{pathname: `/displayWishlist/${wishlist.id}`,
              state: {
                wishlist: wishlist
              }}}><h2 className="friendWishlistTitle" id={wishlist.id}>{wishlist.title}</h2></Link></div>
            )}
          </div>
        }
        </div>
      </div> : <Redirect push to='/'/>
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
})

export default connect(mapStateToProps)(friendsWishlistsContainer);
