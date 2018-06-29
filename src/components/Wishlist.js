import React from 'react';
import PropTypes from 'prop-types';
import NavbarContainer from '../containers/NavbarContainer';
import ItemDetailsModalDisplay from './ItemDetailsModalDisplay';

class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showItemModal: false
    }
  }
  // Modal functions: openModalForItemUpdate & closeItemModal
  openModalForItemDisplay = (item) => {
    this.setState(() => ({
      showItemModal: true,
    }))
  }

  closeItemModal = () => {
    this.setState(() => ({
      showItemModal: false,
    }))
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
              <button onClick={() => this.openModalForItemDisplay(item.name)}>See details</button>
              <ItemDetailsModalDisplay
                showItemModal={this.state.showItemModal}
                closeItemModal={this.closeItemModal}
                item={item}
              />
            </li>
          )}
        </ul>
        }
    </div>
  )
  }
}

export default Wishlist;
