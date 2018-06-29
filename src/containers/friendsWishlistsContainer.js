import React from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase/firebase';

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
    console.log("wishlists ", wishlists);
    console.log("new state: ", this.state);
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

  // Modal functions: openModalForItemUpdate & closeItemModal
  openModalForItemDisplay = (item) => {
    this.setState(() => ({
      showItemModal: true,
    }))
  }

  closeItemModal = () => {
    this.setState(() => ({
      showItemModal: false,
    }))
  }

  render() {
    return (
      <div>
        <h1>{"My friend's wishlists"}</h1>
        {this.state.wishlists.length > 0 &&
          <ul>
            {this.state.wishlists.map((wishlist, index) => <li key={index}><Link
              to={{pathname: `/displayWishlist/${wishlist.id}`,
              state: {
                wishlist: wishlist
              }}}><p id={wishlist.id}>{wishlist.title}</p></Link></li>
            )}
          </ul>
        }
      </div>
    )
  }
}

export default friendsWishlistsContainer;
