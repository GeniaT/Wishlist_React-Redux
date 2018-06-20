import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import EventForm from '../components/EventForm';
import NavbarContainer from './NavbarContainer';
import { saveEventInStateAndDB } from '../actions/events';
import { getEvent } from '../selectors/events';

class EventFormContainer extends React.Component {
  constructor(props) {
    super(props);
    if (props.match.path === '/updateEvent/:id') {
      var eventToUpdate = getEvent(this.props.events, this.props.location.state.eventid);
    }
    this.state = {
      id: eventToUpdate && eventToUpdate.id || uuid(),
      createdBy: eventToUpdate && eventToUpdate.createdBy || props.uid,
      status: eventToUpdate && eventToUpdate.status || 'public',
      title: eventToUpdate && eventToUpdate.title || '',
      participants: eventToUpdate && eventToUpdate.participants || [],
      items: eventToUpdate && eventToUpdate.items || [],
      createdAt: eventToUpdate && eventToUpdate.createdAt || moment().format("dddd, MMMM Do YYYY"),
      date: eventToUpdate && moment(eventToUpdate.date) || moment(),
      note: eventToUpdate && eventToUpdate.note || '',
      showItemModal: false,
      duplicateTitle: '',
      error: '',
      operation: props.location.pathname === '/create-event' ? 'eventCreation' : 'eventUpdate',
      wishlistLinksIds:[],
      removedItemsIds: [],
      removedParticipantsIds: [],
      participantInputValue: ''
    }
  }

  onChangeTitle = (e) => {
    const title = e.target.value;
    this.setState(() => ({title}));
    if (title.trim() !== "" && (this.props.events.find(x => x.title === title) === undefined)) {
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
    const eventLink = e.target;
    if (eventLink.checked == true) {
      this.setState(() => ({eventLinks:[...this.state.eventLinks, eventLink.value]}));
    } else {
      this.setState(() => ({eventLinks: this.state.eventLinks.filter((link) => link !== eventLink.value)}))
    }
  }

  addParticipant = (e, friend, id) => {
    e.preventDefault();
    if (friend && (this.state.participants.find(x => x.name === friend) === undefined)) {
      this.setState(() => ({
        participants:[...this.state.participants, {id:id, name: friend}]
      }));
      return;
    }
  }

  onParticipantInputValueChange = (e) => {
    const participantInputValue = e.target.value;
    this.setState(() => ({participantInputValue}));
  }

  deleteParticipant = (participant) => {
    //update removedParticipants to then update their list of events in the DB
    this.setState(() => ({
      removedParticipantsIds: [...this.state.removedParticipantsIds, participant.id]
    }));
    this.setState((prevState) => ({participants: prevState.participants.filter((x) => x.name !== participant.name)}));
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
  onEventNote = (e) => {
    const note = e.target.value;
    this.setState(() => ({note}));
  }

  //React-Dates library methods
  onDateChange = date => this.setState({ date });
  onFocusChange = ({focused}) => this.setState({ focused });

  render() {
    const {addItem, deleteItem, addParticipant, deleteParticipant, itemInfoInit,
      onEventNote, onDateChange, onFocusChange, onChangeTitle, onChangeStatus, onUpdateItem, onWishlistLink, openModalForItemUpdate,
      removeAllItems, closeItemModal, onParticipantInputValueChange} = this;
    const eventFormMethods = {addItem, deleteItem, addParticipant, deleteParticipant, itemInfoInit,
      onEventNote, onDateChange, onFocusChange, onChangeTitle, onChangeStatus, onUpdateItem, onWishlistLink, openModalForItemUpdate,
      removeAllItems, closeItemModal, onParticipantInputValueChange};

    return this.props.loggedIn ? <div>
      <NavbarContainer />
      <EventForm onSaveEvent={(ev, operation, id, wishlistLinksIds, removedItemsIds, removedParticipantsIds) => {
          this.props.saveEventInStateAndDB(ev, operation, id, wishlistLinksIds, removedItemsIds, removedParticipantsIds);
          this.props.history.push('/my-events');
        }}
          {...this.state}
          {...this.props}
          {...eventFormMethods}
      />
    </div> : <Redirect push to='/'/>
  }
}

const mapStateToProps = (state) => ({
  events: state.events,
  eventsWishlistsLinks: state.eventsWishlistsLinks,
  loggedIn: state.user.loggedIn,
  wishlists: state.wishlists,
  friends: state.friends,
  uid: state.user.uid
})

const mapDispatchToProps = (dispatch) => ({
  saveEventInStateAndDB: (ev, operation, id, wishlistLinksIds, removedItemsIds, removedParticipantsIds) => {
    dispatch(saveEventInStateAndDB(ev, operation, id, wishlistLinksIds, removedItemsIds, removedParticipantsIds))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(EventFormContainer);
