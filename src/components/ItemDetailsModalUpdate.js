import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const ItemDetailsModalUpdate = (props) => {
  return <Modal className="modal"
     isOpen={props.showItemModal}
     onRequestClose={props.closeItemModal}
     onAfterOpen={props.itemInfoInit}
  >
  <div className="outterModalContainer">
    <form className="modalForm">
      <h1>{props.updatingItem}</h1>
      Description:<br/>
      <input
        className="modalInput"
        type="text"
        name="description"
        id="description"
        onChange={props.onUpdateItem}
      /><br/>
      Picture link:<br/>
      <input
        className="modalInput"
        type="text"
        name="pictureLink"
        id="pictureLink"
        onChange={props.onUpdateItem}
      /><br/>
      Link to buy the item:<br/>
      <input
        className="modalInput"
        type="text"
        name="buyLink"
        id="buyLink"
        onChange={props.onUpdateItem}
      /><br/>
      Approximate price:<br/>
      <input
        className="modalInput"
        type="text"
        name="price"
        id="price"
        onChange={props.onUpdateItem}
      /><br/>
      {"Here are some details that may help you with the item :"}<br/>
      <textarea
        className="modalInput"
        name="note"
        id="note"
        onChange={props.onUpdateItem}
      >
      </textarea><br/>
      <button className="btn btnCloseModal" onClick={props.closeItemModal}>Close</button>
    </form>
    </div>
  </Modal>
}

ItemDetailsModalUpdate.propTypes = {
  showItemModal: PropTypes.bool.isRequired,
  itemInfoInit: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
}

export default ItemDetailsModalUpdate;
