import React from 'react';
import uuid from 'uuid';

class WishlistForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      status: 'public',
      title: '',
      items: []
    }
  };

  onChangeTitle = (e) => {
    const title = e.target.value;
    this.setState(() => ({title}));
  }

  onChangeStatus = (e) => {
    const status = e.target.value;
    console.log(e.target);
    this.setState(() => ({status}));
  }

  addItem = (e) => {
    e.preventDefault();
    const item = e.target.element.value.trim();
    this.setState(() => ({items:[...this.state.items, item]}))
    e.target.element.value = "";
  }
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Wishlist title" onChange={this.onChangeTitle}/><br/>
          <input type="radio" name="status" value="public" defaultChecked onChange={this.onChangeStatus}/>Public
          <input type="radio" name="status" value="private" onChange={this.onChangeStatus}/>Private <br/>

          Category:
           <select name="category">
            <option value="books">books</option>
            <option value="video games">video games</option>
            <option value="tech">tech</option>
            <option value="software">software</option>
          </select> <br/>

          Link the list to one of your events ? <br/>
          <input type="checkbox" name="event1" value="event1name" /> Event 1<br/>
          <input type="checkbox" name="event2" value="event2name" /> Event 2<br/>
        </form>
        <form onSubmit={this.addItem}>
          <input type="text" name="element"/>
          <button>Add item</button>
        </form>
      </div>
    )
  }
}

export default WishlistForm;
