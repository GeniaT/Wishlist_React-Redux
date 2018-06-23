import React from 'react';
import { firebase } from '../firebase/firebase';

class friendsWishlistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlists: [],
      friendId: props.location.state.friendId,
    }
  }

  changeWishlists (wishlists) {
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
          this.changeWishlists(wishlists);
        });
      });
    })
  }

  render() {
    return (
      <div>
        <h1>{"My friend's wishlists"}</h1>
        {this.state.wishlists.length > 0 &&
          <div>
            {this.state.wishlists.map((x, index) => <p key={index}>{x.title}</p>)}
          </div>
        }
      </div>
    )
  }
}

export default friendsWishlistsContainer;
