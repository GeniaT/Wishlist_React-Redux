import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Item from './components/Item';
import Items from './components/Items';

class List extends React.Component {
  state = {
    elements: ["a", "b", "c"],
    modalIsOpen: true
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

  render() {
    return (
      <div>
      <h1>Whishlist App</h1>
      <Modal isOpen={this.state.modalIsOpen} >
        <p>TEST</p>
      </Modal>
        <form onSubmit={this.addItem}>
          <input type="text" name="element" />
          <button>Add element</button>
        </form>
        <Items
          items={this.state.elements}
          deleteItem={this.deleteItem}
        />
        <button onClick={this.removeAll}>Remove All</button>
      </div>
    )
  }
}

ReactDOM.render(<List />, document.getElementById('app'));
