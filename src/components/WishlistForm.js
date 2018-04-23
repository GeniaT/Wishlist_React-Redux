import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import ItemDetailsModal from './ItemDetailsModal';
import { futurEvents } from '../selectors/events';
import moment from 'moment';

class WishlistForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.wishlistToUpdate) { //if updating the wishlist
      this.state = {
        ...this.props.wishlistToUpdate,
        operation: 'wishlistUpdate',
        duplicateTitle: '',
        error: '',
        eventLinksIds:[]
       };
    } else { //if creating the wishlist
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
        error: ''
      }
    }
  };

  onChangeTitle = (e) => {
    const title = e.target.value.trim();
    this.setState(() => ({title}));

    if (title !== "" && (this.props.wishlists.find(x => x.title === title) === undefined)) { //to avoid duplicates
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
      this.setState(() => ({
        items:[...this.state.items,
        {
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

  deleteItem = (item) => {
    this.setState((prevState) => ({items: prevState.items.filter((x) => x.name !== item)}));
  }

  removeAllItems = (e) => {
    e.preventDefault(e);
    this.setState(() => ({
      items: []
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
    const wishlistIndexFromMatrix = this.props.eventsWishlistsLinks[0].indexOf(this.state.id);
    let additionalLinks = []; //used because setState can't be run so quickly many times in forEach loop.
    this.props.eventsWishlistsLinks.forEach((row) => {
      if (row[wishlistIndexFromMatrix] === 1) {
        document.getElementById(row[0]).checked = true;
        additionalLinks.push(row[0]);
      }
    });
    this.setState(() => ({eventLinksIds: (this.state.eventLinksIds).concat(additionalLinks)
    }));
  }


  render() {
    return (
      <div>
        <form>
          Wishlist Title: <input type="text" value={this.state.title} onChange={this.onChangeTitle}/><br/>
          <input type="radio" name="status" value="public" checked={this.state.status === "public"} onChange={this.onChangeStatus}/>Public
          <input type="radio" name="status" value="private" checked={this.state.status === "private"} onChange={this.onChangeStatus}/>Private <br/>

          Category:
           <select name="category" value={this.state.category} onChange={this.onChangeCategory}>
            <option value="no category">no category</option>
            <option value="books">books</option>
            <option value="video games">video games</option>
            <option value="tech">tech</option>
            <option value="software">software</option>
          </select> <br/>
          {this.props.events.length > 0 &&
            <div>
              <h4>{'Link the list to one of your futur events ?'}</h4>
              {futurEvents(this.props.events).map((ev, index) =>
                <div key={index}>
                  <input
                    type="checkbox"
                    name="event"
                    value={ev.id}
                    id={ev.id}
                    onChange={this.onEventLink}
                  />
                  <label>{ev.title}</label>
                </div>
              )}
            </div>
          }

        </form>
        <form onSubmit={this.addItem}>
          <input type="text" name="element"/>
          <button>Add item</button>
        </form>
        {this.state.items.length > 0 &&
          <div>
            <h3>Your items:</h3>
            <ul>
              {this.state.items.map((item, index) =>
                <li key={index}>
                  {item.name}
                  <button onClick={() => this.openModalForItemUpdate(item.name)}>Update</button>
                  <button onClick={() => this.deleteItem(item.name)}>Delete</button>
                </li>)}
            </ul>
            <button onClick={this.removeAllItems}>Remove all items</button>
        </div> }
        {this.state.error && <p>{this.state.error}</p>}
        <button disabled={this.state.title.trim() === "" || this.state.duplicateTitle}
          onClick={(wishlist) => this.props.onSaveWishlist({
            id: this.state.id,
            status: this.state.status,
            createdAt: moment(),
            title: this.state.title,
            category: this.state.category,
            eventLinksIds:this.state.eventLinksIds,
            items: this.state.items
          }, this.state.operation, this.state.id, this.state.eventLinksIds)}>{'Save wishlist'}
        </button>
        <ItemDetailsModal
          showItemModal={this.state.showItemModal}
          closeItemModal={this.closeItemModal}
          itemInfoInit={this.itemInfoInit}
          updatingItem={this.state.updatingItem}
          onUpdateItem={this.onUpdateItem}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  wishlists: state.wishlists,
  events: state.events,
  eventsWishlistsLinks: state.eventsWishlistsLinks
})
export default connect(mapStateToProps)(WishlistForm);
