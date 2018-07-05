import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import NavbarContainer from '../containers/NavbarContainer';
import { startEventUpdate } from '../actions/events';


class EventDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showItemModal: false,
      itemToShowIndex: null,
      reservedItems: [],
      unreservedItems: [],
      lockedItems: [],
    }
  }

  reserveAnItem = (item) => {
    const participation = this.props.location.state.event;
    this.setState(() => ({
      reservedItems: this.state.reservedItems.concat(item.id)
    }), () => {
      this.reserveItemInDB(item);
    });
    this.setState(() => ({
      unreservedItems: this.state.unreservedItems.filter((id) => id !== item.id)
    }))
  }

  unreserveAnItem = (item) => {
    const participation = this.props.location.state.event;
    this.setState(() => ({
      reservedItems: this.state.reservedItems.filter((id) => id !== item.id)
    }));
    this.setState(() => ({
      unreservedItems: this.state.unreservedItems.concat(item.id)
    }), () => {
      this.dereserveItemInDB(item);
    })
  }

  reserveItemInDB = (item) => {
    const userId = firebase.auth().currentUser.uid;
    const itemRef = firebase.database().ref(`items/${item.id}/item`);
    itemRef.update({reservedBy: userId});

  }

  dereserveItemInDB = (item) => {
    const userId = firebase.auth().currentUser.uid;
    const itemRef = firebase.database().ref(`items/${item.id}/item`);
    itemRef.update({reservedBy: ''});
  }
  // Modal functions
  openModalForItemDisplay = (item, index) => {
    this.setState(() => ({
      showItemModal: true,
      itemToShowIndex: index
    }))
  }

  closeItemModal = () => {
    this.setState(() => ({
      showItemModal: false,
    }))
  }

  renderModal() {
    // const items = this.props.location.state.event.items;
    const items = this.state.allItems;
    const index = this.state.itemToShowIndex;
    const item = items[index];

    if (!this.state.showItemModal) {
      return null;
    }
    return (
      <div>
        <h1>{item.name}</h1>
        <p>Description: {item.description}</p>
        <p>PictureUrl: {item.picture}</p>
        <p>Url to buy the item: {item.urlToBuy}</p>
        <p>Approximate price: {item.appriximatePrice}</p>
        <p>Note about the item: {item.note}</p>
        <button onClick={() => this.closeItemModal()}>Click me to close!</button>
      </div>
    )
  }

  componentDidMount() {
    const participation = this.props.location.state.event;
    const itemsFromEventArray = [];
    participation.items.forEach((item) => {
      const itemId = item.id;
      const itemRef = firebase.database().ref(`items/${itemId}/item`);
      itemRef.once("value").then(snapshot => {
        itemsFromEventArray.push(snapshot.val());
      }).then(() => console.log('itemsFromEventArray: ', itemsFromEventArray))
    })
    //Need to fetch all items of any wishlists linked to this event by the creator.
      //Get the creator of the event
    const creator = this.props.location.state.event.createdBy;
    const userId = firebase.auth().currentUser.uid;
    const eventId = this.props.location.state.event.id;
    //Get the linksMatrix from the DB
    const linksMatrixRef = firebase.database().ref(`users/${creator}/eventsWishlistsLinksMatrix`);
    let matrix;
    const linkedwishlists = [];
    const itemsFromWishlistsArray = [];
    let globalItemsArray;
    const itemsIds = [];
    //Start identifying the line of the opened event
    linksMatrixRef.once("value")
    .then(function(snapshot) {
      matrix = snapshot.val();
      //check if there is any links to any wishlist
        //push indexes of '1's into an array
        //check each index in this array to get the wishlists Ids that this event is linked to
      if (matrix[0].length === 1) { return }
      matrix.forEach((line) => {
        if (line[0] === eventId) {
          line.forEach((potentialLink, index) => {
            if (potentialLink === 1) {
              linkedwishlists.push(matrix[0][index]);
            }
          });
        }
      });
    })
    .then(() => {
      //get each wishlist id and push each item from that wishlist to an new array
      // finally concat that array of items from wishlists with the items from this event to a global array
      linkedwishlists.forEach((wishlistId) => {
        const wishlistItemsRef = firebase.database().ref(`wishlists/${wishlistId}/items`);
        wishlistItemsRef.once('value')
        .then(snapshot => {
          snapshot.forEach(childSnapshot => {
              const childData = childSnapshot.val();
              const itemRef = firebase.database().ref(`items/${childData.id}/item`);
              itemRef.once("value").then(snapshot => {
                itemsFromWishlistsArray.push(snapshot.val());
              })
              .then(() => globalItemsArray = itemsFromEventArray.concat(itemsFromWishlistsArray))
              .then(() => {
                //based on all items fetched from the DB, we update the state dividing the items into 2 categories:
                //"locked" because it was already reserved by someone and "reserved" for items that I previously reserved
                this.setState(() => ({
                  allItems: globalItemsArray
                }))
                globalItemsArray.forEach((item) => {
                  if (item.reservedBy !== this.props.uid && item.reservedBy !== "" && this.state.lockedItems.indexOf(item.id) === -1) {
                    this.setState(() => ({
                      lockedItems: [...this.state.lockedItems, item.id]
                    }))
                  } else if (this.state.reservedItems.indexOf(item.id) === -1 && item.reservedBy === this.props.uid) {
                    this.setState(() => ({
                      reservedItems: [...this.state.reservedItems, item.id]
                    }));
                  }
                });
              })
          });
        })
      })
    });
  }

  render () {
    const participation = this.props.location.state.event;
    const items = this.state.allItems;
    return this.props.loggedIn ? <div>
        <NavbarContainer />
        <h1>{'Event'} {participation.title}</h1>
        <h2>{'When?'}</h2>
        <p>{moment(participation.date).format("dddd, MMMM Do YYYY")}</p>
        <h2>{'Wished items for this event'}</h2>
        {items && <ul>
          {items.map((item, index) =>
            <li key={index}>
              {item.name}
              <button onClick={() => {
                this.openModalForItemDisplay(item.name, index);
              }}>See details</button>
              <button onClick={() => {
                if (this.state.lockedItems.indexOf(item.id) === -1 && (this.state.reservedItems.length === 0 || this.state.reservedItems.indexOf(item.id) === -1)) {
                  this.reserveAnItem(item);
                } else if (this.state.lockedItems.indexOf(item.id) === -1 && this.state.reservedItems.indexOf(item.id) !== -1) {
                  this.unreserveAnItem(item);
                }
              }} disabled={this.state.lockedItems.indexOf(item.id) !== -1}>{'Reserve this item/Unbook it'}</button>
            </li>
          )}
          <Modal
               isOpen={this.state.showItemModal}
               onRequestClose={this.closeItemModal}
            >
            {this.renderModal()}
          </Modal>
        </ul>}
        <h2>Participants: </h2>
        <ul>
        {participation.participants.map((person, index) =>
          <li key={index}>{person.name}</li>
        )}
        </ul>
        <h2>{'Note about the event'}</h2>
        <p>{participation.note}</p>
      </div> : <Redirect push to='/'/>
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  uid: state.user.uid,
})

// const mapDispatchToProps = (dispatch) => ({
//   // reserveItem: (item) => dispatch(reserveItem(item)),
//   // dereserveItem: (item) => dispatch(dereserveItem(item)),
//   // startEventUpdate: () => dispatch(startEventUpdate()),
// })

export default connect(mapStateToProps)(EventDisplay);
