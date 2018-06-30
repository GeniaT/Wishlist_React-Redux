import React from 'react';
import PropTypes from 'prop-types';
import NavbarContainer from '../containers/NavbarContainer';
import ItemDetailsModalDisplay from './ItemDetailsModalDisplay';
import Modal from 'react-modal';


class Wishlist extends React.Component {
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
    const ref = this.props.location.state.wishlist.items;
    const index = this.state.itemToShowIndex;

    if (!this.state.showItemModal) {
      return null;
    }
    return (
      <div>
        <h1>{ref[index].name}</h1>
        <p>Description: {ref[index].description}</p>
        <p>PictureUrl: {ref[index].picture}</p>
        <p>Url to buy the item: {ref[index].urlToBuy}</p>
        <p>Approximate price: {ref[index].appriximatePrice}</p>
        <p>Note about the item: {ref[index].note}</p>
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
        <Modal
             isOpen={this.state.showItemModal}
             onRequestClose={this.closeItemModal}
          >
          {this.renderModal()}
        </Modal>
        </ul>
        }
    </div>
  )
  }
}

export default Wishlist;
