import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const ItemDetailsModalDisplay = (props) => {
  return <Modal
     isOpen={props.showItemModal}
     onRequestClose={props.closeItemModal}
     onAfterOpen={props.itemInfoInit}
  >
    <h1>{props.updatingItem}</h1>
    Description: {props.item.description}<br/>
    Picture link: {props.item.picture}<br/>
    Link to buy the item: {props.item.urlToBuy}<br/>
    Approximative price: {props.item.appriximatePrice}<br/>
    {"Here are some details that may help you with the item :"}<br/>
    {props.item.note}<br/>
    <button onClick={props.closeItemModal}>Click me to close!</button>
  </Modal>
}

ItemDetailsModalDisplay.propTypes = {
  showItemModal: PropTypes.bool.isRequired,
}

export default ItemDetailsModalDisplay;
