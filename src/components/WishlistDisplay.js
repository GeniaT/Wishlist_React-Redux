import React from 'react';
import PropTypes from 'prop-types';
import NavbarContainer from '../containers/NavbarContainer';
import Modal from 'react-modal';


class WishlistDisplay extends React.Component {
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
    const items = this.props.location.state.wishlist.items;
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
    return (
      <div>
        <NavbarContainer />
        <h1>Wishlist {this.props.location.state.wishlist.title}</h1>
        <h2>{`Categorie: ${this.props.location.state.wishlist.category}`}</h2>
        {this.props.location.state.wishlist.items && <ul>
          {this.props.location.state.wishlist.items.map((item, index) =>
            <li key={index}>
              {item.name}
              <button onClick={() => {
                this.openModalForItemDisplay(item.name, index);
              }}>See details</button>
            </li>
          )}
          <Modal className="modal"
               isOpen={this.state.showItemModal}
               onRequestClose={this.closeItemModal}
            >
            {this.renderModal()}
          </Modal>
        </ul>}
      </div>
    )
  }
}

export default WishlistDisplay;
