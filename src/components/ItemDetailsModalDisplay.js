import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#app');

class ItemDetailsModalDisplay extends React.Component {
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



  render() {
    return <Modal
       isOpen={this.state.showItemModal}
       onRequestClose={this.closeItemModal}
    >
    {this.renderModal}
    </Modal>
  }
}

// ItemDetailsModalDisplay.propTypes = {
//   showItemModal: PropTypes.bool.isRequired,
// }

export default ItemDetailsModalDisplay;
