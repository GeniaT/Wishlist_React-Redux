import React from 'react';
import uuid from 'uuid';
import { Redirect } from 'react-router-dom';
import EventForm from '../Components/EventForm';
import NavbarContainer from './NavbarContainer';
import moment from 'moment';
import {
  saveEvent,
  updateEventsWishlistsLinksMatrix,
  startEventCreation,
  startEventUpdate
 } from '../actions/actions';
import { connect } from 'react-redux';
import { getEvent } from '../selectors/events';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class EventFormContainer extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.pathname === '/create-event') {
      this.state = {
        id: uuid(),
        status: 'public',
        title: '',
        participants: [],
        items:[],
        reservedItems: [],
        note: '',
        showItemModal: false,
        operation: 'eventCreation',
        duplicateTitle: '',
        error: '',
        wishlistLinksIds: [],
        removedItemsIds: []
      }
    } else if (props.match.path === '/updateEvent/:id') {
      const eventToUpdate = getEvent(this.props.events, this.props.location.state.eventid);
      this.state = {
        id: eventToUpdate.id,
        status: eventToUpdate.status,
        title: eventToUpdate.title,
        participants: eventToUpdate.participants,
        items: eventToUpdate.items,
        createdAt: eventToUpdate.createdAt,
        date: eventToUpdate.date,
        note: eventToUpdate.note,
        showItemModal: false,
        duplicateTitle: '',
        error: '',
        operation: 'eventUpdate',
        wishlistLinksIds:[],
        removedItemsIds: []
      }
    }
  }

  onChangeTitle = (e) => {
    const title = e.target.value;
    this.setState(() => ({title}));
    if (title.trim() !== "" && (this.props.events.find(x => x.title === title) === undefined)) { //to avoid duplicates
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
    if (participant !== "" && (this.state.participants.find(x => x === participant) === undefined)) {
      this.setState(() => ({
        participants:[...this.state.participants, participant]
      }));
    }
    e.target.participant.value = '';
  }
  deleteParticipant = (participant) => {
    this.setState((prevState) => ({participants: prevState.participants.filter((x) => x !== participant)}));
  }
  onEventNote = (e) => {
    const note = e.target.value;
    this.setState(() => ({note}));
  }
  onWishlistLink = (e) => {
    const wishlistLink = e.target;
    if (wishlistLink.checked == true) {
      this.setState(() => ({wishlistLinksIds:[...this.state.wishlistLinksIds, wishlistLink.value]}));
    } else {
      this.setState(() => ({wishlistLinksIds: this.state.wishlistLinksIds.filter((link) => link !== wishlistLink.value)}))
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
  componentDidMount() {
    //Update the wishlistLinksIds state
    let eventRowNrFromMatrix = '';
    this.props.eventsWishlistsLinks.forEach((row, index) => {
      if (row[0] === this.state.id) {
        eventRowNrFromMatrix = index;
        return;
      }
    });
    //read the matrix and get the links to be checked in the form during init.
    if (eventRowNrFromMatrix !== '') { //If we are updating the event (not creating)
      let additionalLinks = [];
      this.props.eventsWishlistsLinks[eventRowNrFromMatrix].forEach((wishlistLink, index) => {
        if (wishlistLink === 1) {
          document.getElementById(this.props.eventsWishlistsLinks[0][index]).checked = true;
          additionalLinks.push(this.props.eventsWishlistsLinks[0][index]);
        }
      });
      this.setState(() => ({wishlistLinksIds: (this.state.wishlistLinksIds).concat(additionalLinks)}));
    }
  }

  render() {
    return this.props.loggedIn ? <div>
      <NavbarContainer />
      <EventForm
        onSaveEvent={(ev, operation, id, wishlistLinksIds, removedItemsIds) => {
          this.props.saveEvent(ev, operation);
          this.props.updateEventsWishlistsLinksMatrix(operation, id, wishlistLinksIds);
          this.props.history.push('/my-events');
          if (operation === 'eventCreation') {
            this.props.startEventCreation(ev, id);
          } else if (operation === 'eventUpdate') {
            this.props.startEventUpdate(ev, id, removedItemsIds);
          }
        }}
          addItem={this.addItem}
          addParticipant={this.addParticipant}
          deleteItem={this.deleteItem}
          deleteParticipant={this.deleteParticipant}
          itemInfoInit={this.itemInfoInit}
          onEventNote={this.onEventNote}
          onChangeTitle={this.onChangeTitle}
          onChangeStatus={this.onChangeStatus}
          onWishlistLink={this.onWishlistLink}
          openModalForItemUpdate={this.openModalForItemUpdate}
          removeAllItems={this.removeAllItems}

          duplicateTitle={this.state.duplicateTitle}
          error={this.state.error}
          id={this.state.id}
          items={this.state.items}
          note={this.state.note}
          operation={this.state.operation}
          participants={this.state.participants}
          title={this.state.title}
          status={this.state.status}
          createdAt={moment().format("dddd, MMMM Do YYYY")}
          wishlists={this.props.wishlists}
          wishlistLinksIds={this.state.wishlistLinksIds}
          removedItemsIds={this.state.removedItemsIds}
          showItemModal={this.state.showItemModal}
          closeItemModal={this.closeItemModal}
          updatingItem={this.state.updatingItem}
          updatingItem={this.updatingItem}

          date={this.state.date || moment()}
          onDateChange={date => this.setState({ date })}
          focused={this.state.focused}
          reopenPickerOnClearDate={true}
          onFocusChange={({ focused }) => this.setState({ focused })}
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

// const mapDispatchToProps = {
//   saveEvent,
//   updateEventsWishlistsLinksMatrix
// }
const mapDispatchToProps = (dispatch) => ({
  saveEvent: (ev, operation) => dispatch(saveEvent(ev, operation)),
  updateEventsWishlistsLinksMatrix: (operation, id, linksIds) => dispatch(updateEventsWishlistsLinksMatrix(operation, id, linksIds)),
  startEventCreation: (ev, id) => dispatch(startEventCreation(ev, id)),
  startEventUpdate: (ev, id, removedItemsIds) => dispatch(startEventUpdate(ev, id, removedItemsIds))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventFormContainer);
