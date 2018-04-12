import React from 'react';
import uuid from 'uuid';
import Modal from 'react-modal';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.eventToUpdate) {//if updating the event
      this.state = {...this.props.eventToUpdate}
    } else {
      this.state = {
        id: uuid(),
        date: '',
        status: 'public',
        title: '',
        participants: [],
        items:[],
        reservedItems: [],
        note: '',
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
    onChangeDate = (e) => {
      const date = e.target.value;
      this.setState(() => ({date}));
    }
    onEventLink = (e) => {
      // probably won't work well for now.
      const eventLink = e.target;
      if (eventLink.checked == true) {
        this.setState(() => ({eventLinks:[...this.state.eventLinks, eventLink.value]}));
      } else {
        this.setState(() => ({eventLinks: this.state.eventLinks.filter((link) => link !== eventLink.value)}))
      }
    }
    addParticipant = (e) => {
      e.preventDefault();
      const participant = e.target.participant.value.trim();
      this.setState(() => ({
        participants:[...this.state.participants, participant]
      }));
      e.target.participant.value = '';
    }
    deleteParticipant = (participant) => {
      this.setState((prevState) => ({participants: prevState.participants.filter((x) => x !== participant)}));
    }
    onEventNote = (e) => {
      const note = e.target.value;
      this.setState(() => ({note}));
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
          {'Event Title: '}<input type="text" value={this.state.title} onChange={this.onChangeTitle}/>
          {'Date:'} <input type="text" value={this.state.date} onChange={this.onChangeDate}/><br/>
          <input type="radio" name="status" value="public" checked={this.state.status === "public"} onChange={this.onChangeStatus}/>Public
          <input type="radio" name="status" value="private" checked={this.state.status === "private"} onChange={this.onChangeStatus}/>Private <br/>

          {'Link wishlists to this event?'}<br/>
          <input type="checkbox" name="wishlist1" value="wishlist1" onChange={this.onWishlistLink}/> wishlist 1<br/>
          <input type="checkbox" name="wishlist2" value="wishlist2" onChange={this.onWishlistLink}/> wishlist 2<br/>
        </form>
        {'Wanted participants:'}<br/>
        <form onSubmit={this.addParticipant}>
          <input type="text" name="participant"/>
          <button>Add Participant</button><br/>
        </form>
        {this.state.participants.length !== 0 &&
          <div>
            <h3>{'Desired participants:'}</h3>
            <ul>
              {this.state.participants.map((participant, index) =>
                <li key={index}>
                  {participant}
                  <button onClick={() => this.deleteParticipant(participant)}>Delete</button>
                </li>)}
            </ul>
        </div> }
        {'Add another item to this event outside your linked wishlists?'}<br/>
        <form onSubmit={this.addItem}>
          <input type="text" name="element"/>
          <button>Add item</button>
        </form>
        {this.state.items.length !== 0 &&
          <div>
            <h3>{'Your additional items outside your premade wishlists:'}</h3>
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
        {'Note about this event:'}<br/>
        <textarea
          rows="4"
          cols="50"
          name="note"
          value={this.state.note}
          onChange={this.onEventNote}
        >
        </textarea><br/>
        <button disabled={this.state.title.trim() === ""}
          onClick={(ev) => this.props.onSaveEvent({
            id: this.state.id,
            status: this.state.status,
            title: this.state.title,
            date: this.state.date,
            participants:this.state.participants,
            items: this.state.items,
            note: this.state.note
          })}>{'Save Event'}</button>
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

export default EventForm;
