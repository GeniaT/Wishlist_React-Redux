import React from 'react';
import Item from './Item';
import Items from './Items';
import Navbar from './Navbar';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#app');

class List extends React.Component {
  state = {
    elements: ["a", "b", "c"],
    modalIsOpen: false,
    id: 69
  }

  addItem = (e) => {
    const itemToAdd = e.target.element.value.trim();
    e.preventDefault(e);

    if (itemToAdd !== "") {
      this.setState((prevState) => ({
        elements: prevState.elements.concat(itemToAdd)
      }));

      e.target.element.value = "";
    }
  }

  removeAll = (e) => {
    e.preventDefault(e);
    this.setState(() => ({
      elements: []
    }));
  }

  deleteItem = (itemText) => {
    this.setState((prevState) => ({
      elements: prevState.elements.filter((x) => x !== itemText)
    }));
  }

  openModal = (itemText) => {
    this.setState(() => ({
      modalIsOpen: true
    }));
  }
  closeModal = () => {
    this.setState(() => ({
      modalIsOpen: false
    }));
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Wishlist App</h1>
        <h2>Create and share your wishlist!</h2>
        <Link to={`/event/${this.state.id}`}>TEST DYNAMIC LINK</Link>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Item to modify"
        >
          <div>
            <h1>Modaaaaal</h1>
            <p>LoL</p>
            <button onClick={this.closeModal}>Click me to close!</button>
          </div>
        </Modal>
        <form onSubmit={this.addItem}>
          <input type="text" name="element" />
          <button>Add element</button>
        </form>
        <Items
          items={this.state.elements}
          deleteItem={this.deleteItem}
          openModal={this.openModal}
        />
        <button onClick={this.removeAll}>Remove All</button>
      </div>
    )
  }
}

export default List;
