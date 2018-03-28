import React from 'react';

const Item = (props) => (
    <div>
      {props.itemText}
      <button onClick={() => {props.openModal(props.itemText)}}>Modify</button>
      <button onClick={() => {props.deleteItem(props.itemText)}}>Delete</button>
    </div>
)

export default Item;
