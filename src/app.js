import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Item from './components/Item';
import Items from './components/Items';
import './styles/index.scss';
import 'normalize.css';

Modal.setAppElement('#app');

class List extends React.Component {
  state = {
    elements: ["a", "b", "c"],
    modalIsOpen: false
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
        <h1>Wishlist App</h1>
        <h2>Create and share your wishlist!</h2>
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

ReactDOM.render(<List />, document.getElementById('app'));
