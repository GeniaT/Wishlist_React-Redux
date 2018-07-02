import React from 'react';
import PropTypes from 'prop-types';
import NavbarContainer from '../containers/NavbarContainer';
import Modal from 'react-modal';
import moment from 'moment';

class EventDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showItemModal: false,
      itemToShowIndex: null,
    }
  }
  // Modal functions: openModalForItemUpdate & closeItemModal
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

  render () {
    const participation = this.props.location.state.event;
    return (
      <div>
        <NavbarContainer />
        <h1>Wishlist {participation.title}</h1>
        <h2>{'When?'} {moment(participation.date).format("dddd, MMMM Do YYYY")}</h2>
        {participation.items && <ul>
          {participation.items.map((item, index) =>
            <li key={index}>
              {item.name}
              <button onClick={() => {
                this.openModalForItemDisplay(item.name, index);
              }}>See details</button>
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
      </div>
    )
  }
}

export default EventDisplay;
