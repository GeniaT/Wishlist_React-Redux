import React from 'react';
import uuid from 'uuid';

class WishlistForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      status: 'public',
      title: '',
      category: 'no category',
      eventLinks:[],
      items: []
    }
  };

  onChangeTitle = (e) => {
    const title = e.target.value;
    this.setState(() => ({title}));
  }

  onChangeStatus = (e) => {
    const status = e.target.value;
    this.setState(() => ({status}));
  }

  onChangeCategory = (e) => {
    const category = e.target.value;
    this.setState(() => ({category}));
  }
  onEventLink = (e) => {
    const eventLink = e.target;
    if (eventLink.checked == true) {
      this.setState(() => ({eventLinks:[...this.state.eventLinks, eventLink.value]}));
    } else {
      this.setState(() => ({eventLinks: this.state.eventLinks.filter((link) => link !== eventLink.value)}))
    }
  }
  addItem = (e) => {
    e.preventDefault();
    const item = e.target.element.value.trim();
    if (item !== "") {
      this.setState(() => ({items:[...this.state.items, item]}));
    }
    e.target.element.value = "";
  }

  deleteItem = (item) => {
    this.setState((prevState) => ({items: prevState.items.filter((x) => x !== item) }));
  }
  removeAllItems = (e) => {
    e.preventDefault(e);
    this.setState(() => ({
      items: []
    }));
  }
  onSubmitWishlistForm = (e) => {
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitWishlistForm}>
          <input type="text" placeholder="Wishlist title" onChange={this.onChangeTitle}/><br/>
          <input type="radio" name="status" value="public" defaultChecked onChange={this.onChangeStatus}/>Public
          <input type="radio" name="status" value="private" onChange={this.onChangeStatus}/>Private <br/>

          Category:
           <select name="category" onChange={this.onChangeCategory}>
           <option value="no category">no category</option>
            <option value="books">books</option>
            <option value="video games">video games</option>
            <option value="tech">tech</option>
            <option value="software">software</option>
          </select> <br/>

          Link the list to one of your events ? <br/>
          <input type="checkbox" name="event1" value="event1" onChange={this.onEventLink}/> Event 1<br/>
          <input type="checkbox" name="event2" value="event2" onChange={this.onEventLink}/> Event 2<br/>
        </form>
        <form onSubmit={this.addItem}>
          <input type="text" name="element"/>
          <button>Add item</button>
        </form>
        {this.state.items.length !== 0 &&
          <div>
            <h3>Your items:</h3>
            <ul>
              {this.state.items.map((item, index) =>
                <li key={index}>
                  {item}
                  <button>Update</button>
                  <button onClick={() => this.deleteItem(item)}>Delete</button>
                </li>)}
            </ul>
            <button onClick={this.removeAllItems}>Remove all items</button>
        </div> }
      </div>
    )
  }
}

export default WishlistForm;
