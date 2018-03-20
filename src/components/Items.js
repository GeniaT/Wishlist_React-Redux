import React from 'react';
import Item from './Item';

const Items = (props) => (
    <div>
      {props.items.map((x) => {
        return <Item key={x} itemText={x} deleteItem={props.deleteItem}/>;
      })}
    </div>
)

export default Items;
