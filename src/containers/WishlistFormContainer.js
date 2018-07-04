import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import uuid from 'uuid';
import WishlistForm from '../components/WishlistForm';
import NavbarContainer from './NavbarContainer';
import { saveWishlistInStateAndDB } from '../actions/wishlists';
import { getWishlist } from '../selectors/wishlists';

class WishlistFormContainer extends React.Component {
  constructor(props) {
    super(props);
    if (props.match.path === '/updateWishlist/:id') {
      var wishlistToUpdate = getWishlist(this.props.wishlists, this.props.location.state.wishlistid);
    }
      this.state = {
        id: wishlistToUpdate && wishlistToUpdate.id || uuid(),
        createdBy: wishlistToUpdate && wishlistToUpdate.createdBy || props.uid,
        status: wishlistToUpdate && wishlistToUpdate.status || 'public',
        title: wishlistToUpdate && wishlistToUpdate.title || '',
        category: wishlistToUpdate && wishlistToUpdate.category || 'no category',
        eventLinksIds: wishlistToUpdate && wishlistToUpdate.eventLinksIds || [],
        items: wishlistToUpdate && wishlistToUpdate.items || [],
        showItemModal: false,
        createdAt: wishlistToUpdate && wishlistToUpdate.createdAt || moment().format("dddd, MMMM Do YYYY"),
        operation: props.location.pathname === '/create-wishlist' ? 'wishlistCreation' : 'wishlistUpdate',
        duplicateTitle: '',
        error: '',
        removedItemsIds: []
      }
    }

    onChangeTitle = (e) => {
      const title = e.target.value  ;
      this.setState(() => ({title}));

      if (title.trim() !== "" && (this.props.wishlists.find(x => x.title === title) === undefined)) { //to avoid duplicates
        this.setState(() => ({
          duplicateTitle: false,
          error: ''
        }));
      } else {
        this.setState(() => ({
          duplicateTitle: true,
          error: 'This title is already taken, please choose another one.'
        }));
      }
    }

    onChangeStatus = (e) => {
      const status = e.target.value;
      this.setState(() => ({status}));
    }

    onChangeCategory = (e) => {
      const category = e.target.value;
      this.setState(() => ({category}));
    }

    onEventLink = (e) => {
      const eventLink = e.target;
      if (eventLink.checked == true) {
        this.setState(() => ({eventLinksIds:[...this.state.eventLinksIds, eventLink.value]}));
      } else {
        this.setState(() => ({eventLinksIds: this.state.eventLinksIds.filter((link) => link !== eventLink.value)}))
      }
    }
    addItem = (e) => {
      e.preventDefault();
      const item = e.target.element.value.trim();
      if (item !== "" && (this.state.items.find(x => x.name === item) === undefined)) { //to avoid duplicates
        const itemId = uuid();
        this.setState(() => ({
          items:[...this.state.items,
          {
            id: itemId,
            name: item,
            description: '',
            picture: '',
            urlToBuy: '',
            appriximatePrice: '',
            note: '',
            reservedBy: '',
          }]
        }));
      }
      e.target.element.value = "";
    }

    deleteItem = (itemId) => {
      this.setState((prevState) => ({
        removedItemsIds: [...this.state.removedItemsIds, itemId],
        items: prevState.items.filter((x) => x.id !== itemId),
      }));
    }

    removeAllItems = (e) => {
      e.preventDefault(e);
      this.setState((prevState) => ({
        items: [],
        removedItemsIds: prevState.items.reduce((accumulator, currentValue) => {
            return [...accumulator, currentValue.id]
          }, [])
      }));
    }

    // Modal functions: openModalForItemUpdate & closeItemModal
    openModalForItemUpdate = (item) => {
      this.setState(() => ({
        showItemModal: true,
        updatingItem: item
      }))
    }

    closeItemModal = () => {
      this.setState(() => ({
        showItemModal: false,
        updatingItem: ''
      }))
    }

  onUpdateItem = (e) => {
    const myUpdate = e.target.value;
    const itemToUpdate = this.state.items.find(obj => obj.name === this.state.updatingItem);

    switch(e.target.name) {
      case "description":
        this.setState(() => {itemToUpdate.description = myUpdate});
        break;
      case "pictureLink":
        this.setState(() => {itemToUpdate.picture = myUpdate});
        break;
      case "buyLink":
        this.setState(() => {itemToUpdate.urlToBuy = myUpdate});
        break;
      case "price":
        this.setState(() => {itemToUpdate.appriximatePrice = myUpdate});
        break;
      case "note":
        this.setState(() => {itemToUpdate.note = myUpdate});
        break;
    }
  }

  itemInfoInit = () => {
    let indx;
    let item;
    return new Promise ((resolve) => {
      this.state.items.forEach((x, index) => {
        if (x.name === this.state.updatingItem) {
          indx = index;
          item = this.state.items[indx];
        }
    })}).then(Promise.all([
      document.getElementById('description').value = item.description,
      document.getElementById('pictureLink').value = item.picture,
      document.getElementById('buyLink').value = item.urlToBuy,
      document.getElementById('price').value = item.appriximatePrice,
      document.getElementById('note').value = item.note
    ]));
  }

  componentDidMount() {
      if (this.props.match.path === '/updateWishlist/:id') {
    //We update the eventLinksIds state, then use it to update the link matrix in global state when saving the form.
      const wishlistIndexFromMatrix = this.props.eventsWishlistsLinks[0].indexOf(this.state.id);
      let additionalLinks = []; //used because setState can't be run so quickly many times in forEach loop.
      this.props.eventsWishlistsLinks.forEach((row) => {
        if (row[wishlistIndexFromMatrix] === 1) {
          document.getElementById(row[0]).checked = true;
          additionalLinks.push(row[0]);
        }
      });
      this.setState(() => ({eventLinksIds: (this.state.eventLinksIds).concat(additionalLinks)}));
    }
  }

    render () {
      const {addItem, deleteItem, closeItemModal, itemInfoInit, onChangeCategory, onChangeStatus,
         onChangeTitle, onEventLink, onUpdateItem, openModalForItemUpdate, removeAllItems} = this;
      const wishlistFormMethods = {addItem, deleteItem, closeItemModal, itemInfoInit, onChangeCategory,
         onChangeStatus, onChangeTitle, onEventLink, onUpdateItem, openModalForItemUpdate, removeAllItems};

      return this.props.loggedIn ? <div>
        <NavbarContainer />
        <WishlistForm onSaveWishlist={(wishlist, operation, id, eventLinksIds, removedItemsIds) => {
          this.props.saveWishlistInStateAndDB(wishlist, operation, id, eventLinksIds, removedItemsIds);
          this.props.history.push('/');
          }}
          {...this.state}
          {...this.props}
          {...wishlistFormMethods}
        />
      </div> : <Redirect push to='/'/>
    }
}

const mapStateToProps = (state) => ({
  events: state.events,
  eventsWishlistsLinks: state.eventsWishlistsLinks,
  loggedIn: state.user.loggedIn,
  uid: state.user.uid,
  wishlists: state.wishlists,
})

const mapDispatchToProps = (dispatch) => ({
  saveWishlistInStateAndDB: (wishlist, operation, id, eventLinksIds, removedItemsIds) => dispatch(saveWishlistInStateAndDB(wishlist, operation, id, eventLinksIds, removedItemsIds)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WishlistFormContainer);
