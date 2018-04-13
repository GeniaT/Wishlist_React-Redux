import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const ItemDetailsModal = (props) => {
  return <Modal
     isOpen={props.showItemModal}
     onRequestClose={props.closeItemModal}
     onAfterOpen={props.itemInfoInit}
  >
    <h1>{props.updatingItem}</h1>
    <form>
      Description:
      <input
        type="text"
        name="description"
        id="description"
        onChange={props.onUpdateItem}
      /><br/>
      Picture link:
      <input
        type="text"
        name="pictureLink"
        id="pictureLink"
        onChange={props.onUpdateItem}
      /><br/>
      Link to buy the item:
      <input
        type="text"
        name="buyLink"
        id="buyLink"
        onChange={props.onUpdateItem}
      /><br/>
      Approximative price:
      <input
        type="text"
        name="price"
        id="price"
        onChange={props.onUpdateItem}
      /><br/>
      {"Here are some details that may help you with the item :"}<br/>
      <textarea
        rows="4"
        cols="50"
        name="note"
        id="note"
        onChange={props.onUpdateItem}
      >
      </textarea><br/>
    </form>
    <button onClick={props.closeItemModal}>Click me to close!</button>
  </Modal>
}

export default ItemDetailsModal;
