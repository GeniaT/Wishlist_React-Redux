import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import WishlistForm from '../Components/WishlistForm';
import NavbarContainer from './NavbarContainer';
import {
  saveWishlist,
  updateEventsWishlistsLinksMatrix,
  startWishlistCreation,
  startWishlistUpdate,
  updateLinksMatrixInDB
} from '../actions/actions';
import { getWishlist } from '../selectors/wishlists';

class WishlistFormContainer extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.pathname === '/create-wishlist') {
      this.state = {
        id: uuid(),
        status: 'public',
        title: '',
        category: 'no category',
        eventLinksIds:[],
        items: [],
        showItemModal: false,
        operation: 'wishlistCreation',
        duplicateTitle: '',
        error: '',
        removedItemsIds: []
      }
    } else if (props.match.path === '/updateWishlist/:id') {
      const wishlistToUpdate = getWishlist(this.props.wishlists, this.props.location.state.wishlistid);
        this.state = {
          id: wishlistToUpdate.id,
          status: wishlistToUpdate.status,
          title: wishlistToUpdate.title,
          category: wishlistToUpdate.category,
          eventLinksIds: wishlistToUpdate.eventLinksIds,
          items: wishlistToUpdate.items,
          operation: 'wishlistUpdate',
          duplicateTitle: '',
          error: '',
          eventLinksIds:[],
          removedItemsIds: []
         }
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
            note: ''
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

    // Modal functions:
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
      return this.props.loggedIn ? <div>
        <NavbarContainer />
        <WishlistForm onSaveWishlist={(wishlist, operation, id, eventLinksIds, removedItemsIds) => {
          this.props.saveWishlist(wishlist, operation);
          this.props.history.push('/');
          if (operation === 'wishlistCreation') {
            this.props.startWishlistCreation(wishlist, id);
          } else if (operation === 'wishlistUpdate') {
            this.props.startWishlistUpdate(wishlist, id, removedItemsIds);
          }
          return new Promise(resolve => {
            this.props.updateEventsWishlistsLinksMatrix(operation, id, eventLinksIds);
          }).then(this.props.updateLinksMatrixInDB())
          }}

          addItem={this.addItem}
          deleteItem={this.deleteItem}
          closeItemModal={this.closeItemModal}
          itemInfoInit={this.props.match.path === '/updateWishlist/:id' ? this.itemInfoInit : undefined}
          onChangeCategory={this.onChangeCategory}
          onChangeStatus={this.onChangeStatus}
          onChangeTitle={this.onChangeTitle}
          onEventLink={this.onEventLink}
          onUpdateItem={this.onUpdateItem}
          openModalForItemUpdate={this.openModalForItemUpdate}
          removeAllItems={this.removeAllItems}

          id={this.state.id}
          operation={this.state.operation}
          eventLinksIds={this.state.eventLinksIds}
          removedItemsIds={this.state.removedItemsIds}
          title={this.state.title}
          status={this.state.status}
          createdAt={moment().format("dddd, MMMM Do YYYY")}
          category={this.state.category}
          items={this.state.items}
          error={this.state.error}
          duplicateTitle={this.state.duplicateTitle}
          events={this.props.events}
          showItemModal={this.state.showItemModal}
        />
      </div> : <Redirect push to='/'/>
    }
}

const mapStateToProps = (state) => ({
  events: state.events,
  eventsWishlistsLinks: state.eventsWishlistsLinks,
  loggedIn: state.user.loggedIn,
  wishlists: state.wishlists,
})

const mapDispatchToProps = (dispatch) => ({
  saveWishlist: (wishlist, operation) => dispatch(saveWishlist(wishlist, operation)),
  updateEventsWishlistsLinksMatrix: (operation, id, linksIds) => dispatch(updateEventsWishlistsLinksMatrix(operation, id, linksIds)),
  startWishlistCreation: (wishlist, id) => dispatch(startWishlistCreation(wishlist, id)),
  startWishlistUpdate: (wishlist, id, removedItemsIds) => dispatch(startWishlistUpdate(wishlist, id, removedItemsIds)),
  updateLinksMatrixInDB: () => dispatch(updateLinksMatrixInDB()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WishlistFormContainer);
