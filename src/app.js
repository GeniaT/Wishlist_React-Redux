import React from 'react';
import ReactDOM from 'react-dom';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.removeAll = this.removeAll.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      elements: ["a", "b", "c"]
    }
  }

  addItem(e) {
    const itemToAdd = e.target.element.value;
    e.preventDefault(e);
    this.setState((prevState) => ({
      elements: prevState.elements.concat(itemToAdd)
    }));

    e.target.element.value = "";
  }

  removeAll(e) {
    e.preventDefault(e);
    this.setState(() => ({
      elements: []
    }));
  }

  deleteItem(itemText) {
    this.setState((prevState) => ({
      elements: prevState.elements.filter((x) => x !== itemText)
    }));
  }

  render() {
    return (
      <div>
      <h1>Whishlist App</h1>
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

const Items = (props) => {
  return (
    <div>
      {props.items.map((x) => {
        return <Item key={x} itemText={x} deleteItem={props.deleteItem}/>;
      })}
    </div>
  )
}

const Item = (props) => {
  return (
    <div>
      {props.itemText}
      <button onClick={() => {props.deleteItem(props.itemText)}}>Delete</button>
    </div>
  )
}



ReactDOM.render(<List />, document.getElementById('app'));
