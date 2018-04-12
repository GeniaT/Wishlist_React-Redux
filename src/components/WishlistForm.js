import React from 'react';
import uuid from 'uuid';
import Modal from 'react-modal';

Modal.setAppElement('#app');

class WishlistForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.wishlistToUpdate) { //if updating the wishlist
      this.state = {...this.props.wishlistToUpdate};
    } else { //if creating the wishlist
      this.state = {
        id: uuid(),
        status: 'public',
        title: '',
        category: 'no category',
        eventLinks:[],
        items: [],
        showItemModal: false
      }
    }
  };

  onChangeTitle = (e) => {
    const title = e.target.value;
    this.setState(() => ({title}));
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
      this.setState(() => ({eventLinks:[...this.state.eventLinks, eventLink.value]}));
    } else {
      this.setState(() => ({eventLinks: this.state.eventLinks.filter((link) => link !== eventLink.value)}))
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

          {'Link the list to one of your events ?'} <br/>
          <input type="checkbox" name="event1" value="event1" onChange={this.onEventLink}/> Event 1<br/>
          <input type="checkbox" name="event2" value="event2" onChange={this.onEventLink}/> Event 2<br/>
        </form>
        <form onSubmit={this.addItem}>
          <input type="text" name="element"/>
          <button>Add item</button>
        </form>
        {this.state.items.length !== 0 &&
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
        <button disabled={this.state.title.trim() === ""}
          onClick={(wishlist) => this.props.onSaveWishlist({
            id: this.state.id,
            status: this.state.status,
            title: this.state.title,
            category: this.state.category,
            eventLinks:this.state.eventLinks,
            items: this.state.items
          })}>Save wishlist</button>
        <Modal
           isOpen={this.state.showItemModal}
           onRequestClose={this.closeItemModal}
           onAfterOpen={this.itemInfoInit}
        >
          <h1>{this.state.updatingItem}</h1>
          <form>
            Description:
            <input
              type="text"
              name="description"
              id="description"
              onChange={this.onUpdateItem}
            /><br/>
            Picture link:
            <input
              type="text"
              name="pictureLink"
              id="pictureLink"
              onChange={this.onUpdateItem}
            /><br/>
            Link to buy the item:
            <input
              type="text"
              name="buyLink"
              id="buyLink"
              onChange={this.onUpdateItem}
            /><br/>
            Approximative price:
            <input
              type="text"
              name="price"
              id="price"
              onChange={this.onUpdateItem}
            /><br/>
            {"Here are some details that may help you with the item :"}<br/>
            <textarea
              rows="4"
              cols="50"
              name="note"
              id="note"
              onChange={this.onUpdateItem}
            >
            </textarea><br/>
          </form>
          <button onClick={this.closeItemModal}>Click me to close!</button>
        </Modal>
      </div>
    )
  }
}

export default WishlistForm;
