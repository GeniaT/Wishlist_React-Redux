import React from 'react';
import uuid from 'uuid';
import ItemDetailsModal from './ItemDetailsModal';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.eventToUpdate) {//if updating the event
      this.state = {
        ...this.props.eventToUpdate,
        duplicateTitle: '',
        error: ''
      }
    } else {
      this.state = {
        id: uuid(),
        status: 'public',
        title: '',
        participants: [],
        items:[],
        reservedItems: [],
        note: '',
        showItemModal: false,
        duplicateTitle: '',
        error: ''
      }
    }
  };
    onChangeTitle = (e) => {
      const title = e.target.value;
      this.setState(() => ({title}));

      if (title !== "" && (this.props.events.find(x => x.title === title) === undefined)) { //to avoid duplicates
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
        default: return;
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
          <SingleDatePicker
            date={this.state.date || moment()}
            onDateChange={date => this.setState({ date })}
            focused={this.state.focused}
            reopenPickerOnClearDate={true}
            onFocusChange={({ focused }) => this.setState({ focused })}
          /><br/>
          <input type="radio" name="status" value="public" checked={this.state.status === "public"} onChange={this.onChangeStatus}/>Public
          <input type="radio" name="status" value="private" checked={this.state.status === "private"} onChange={this.onChangeStatus}/>Private <br/>

          {this.props.wishlists.length > 0 &&
            <div>
              <h4>{'Link the event to your wishlist ?'}</h4>
              {this.props.wishlists.map((list, index) =>
                <div key={index}>
                  <input type="checkbox" name="choosewishlist" value="wishlist" onChange={this.onWishlistLink}/>
                  <label>{list.title}</label><br/>
                </div>
              )}
            </div>
          }
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
        {this.state.items.length > 0 &&
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
        {this.state.error && <p>{this.state.error}</p>}
        <button disabled={this.state.title.trim() === "" || this.state.duplicateTitle}
          onClick={(ev) => this.props.onSaveEvent({
            id: this.state.id,
            status: this.state.status,
            createdAt: moment(),
            title: this.state.title,
            date: this.state.date,
            participants:this.state.participants,
            items: this.state.items,
            note: this.state.note
          })}>{'Save Event'}
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
  events: state.events
})

export default connect(mapStateToProps)(EventForm);
