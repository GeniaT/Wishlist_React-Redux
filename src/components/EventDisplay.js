import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
      this.props.startEventUpdate(participation, participation.id, null, null, this.state.reservedItems, this.state.unreservedItems)
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
      this.props.startEventUpdate(participation, participation.id, null, null, this.state.reservedItems, this.state.unreservedItems)
    })
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
    const items = this.props.location.state.event.items;
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
    participation.items.forEach((item) => {
      if (item.reservedBy !== this.props.uid && item.reservedBy !== "") {
        this.setState(() => ({
          lockedItems: [...this.state.lockedItems, item.id]
        }))
      } else if (item.reservedBy === this.props.uid) {
        this.setState((prevState) => ({
          reservedItems: [...prevState.reservedItems, item.id]
        }));
      }
    });
  }

  render () {
    const participation = this.props.location.state.event;
    return this.props.loggedIn ? <div>
        <NavbarContainer />
        <h1>{'Event'} {participation.title}</h1>
        <h2>{'When?'} {moment(participation.date).format("dddd, MMMM Do YYYY")}</h2>
        {participation.items && <ul>
          {participation.items.map((item, index) =>
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

const mapDispatchToProps = (dispatch) => ({
  startEventUpdate: (ev, id, removedItemsIds, removedParticipantsIds, reservedItems, unreservedItems) =>
    dispatch(startEventUpdate(ev, id, removedItemsIds, removedParticipantsIds, reservedItems, unreservedItems)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDisplay);
