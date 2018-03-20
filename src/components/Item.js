import React from 'react';

const Item = (props) => (
    <div>
      {props.itemText}
      <button onClick={() => {props.deleteItem(props.itemText)}}>Delete</button>
    </div>
)

export default Item;
