import React from 'react';
import uuid from 'uuid';
import Modal from 'react-modal';

Modal.setAppElement('#app');

class WishlistForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      status: 'public',
      title: '',
      category: 'no category',
      eventLinks:[],
      items: [],
      showItemModal: false,
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
    if (item !== "") {
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
      showItemModal: false
    }))
  }

onChangeDescription = (e) => {
  const description = e.target.value;
  const itemToUpdate = this.state.items.find(obj => obj.name === this.state.updatingItem)
  this.setState(() => {itemToUpdate.description = description});
}

onChangePictureLink = (e) => {
  const pictureLink = e.target.value;
  const itemToUpdate = this.state.items.find(obj => obj.name === this.state.updatingItem)
  this.setState(() => {itemToUpdate.picture = pictureLink});
}

onChangeToBuyLink = (e) => {
  const toBuyLink = e.target.value;
  const itemToUpdate = this.state.items.find(obj => obj.name === this.state.updatingItem)
  this.setState(() => {itemToUpdate.urlToBuy = toBuyLink});
}

onChangePrice = (e) => {
  const price = e.target.value;
  const itemToUpdate = this.state.items.find(obj => obj.name === this.state.updatingItem)
  this.setState(() => {itemToUpdate.appriximatePrice = price});
}

onChangeNoteArea = (e) => {
  const note = e.target.value;
  const itemToUpdate = this.state.items.find(obj => obj.name === this.state.updatingItem)
  this.setState(() => {itemToUpdate.note = note});
}

// try to replace the 5 functions above with one having the same 2 const for all and
// just a switch case to update the local state.  
  render() {
    return (
      <div>
        <form>
          Wishlist Title: <input type="text" onChange={this.onChangeTitle}/><br/>
          <input type="radio" name="status" value="public" defaultChecked onChange={this.onChangeStatus}/>Public
          <input type="radio" name="status" value="private" onChange={this.onChangeStatus}/>Private <br/>

          Category:
           <select name="category" onChange={this.onChangeCategory}>
           <option value="no category">no category</option>
            <option value="books">books</option>
            <option value="video games">video games</option>
            <option value="tech">tech</option>
            <option value="software">software</option>
          </select> <br/>

          Link the list to one of your events ? <br/>
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
        >
          <h1>{this.state.updatingItem}</h1>
          <form>
            Decription: <input type="text" onChange={this.onChangeDescription}/><br/>
            Picture link: <input type="text" onChange={this.onChangePictureLink}/><br/>
            Link to buy the item: <input type="text" onChange={this.onChangeToBuyLink}/><br/>
            Approximative price: <input type="text" onChange={this.onChangePrice}/><br/>
            {"Here are some details that may help you with the item :"}<br/>
            <textarea rows="4" cols="50" onChange={this.onChangeNoteArea}>

            </textarea><br/>
          </form>
          <button onClick={this.closeItemModal}>Click me to close!</button>
        </Modal>
      </div>
    )
  }
}

export default WishlistForm;
