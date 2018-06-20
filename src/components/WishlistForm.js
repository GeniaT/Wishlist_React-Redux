import React from 'react';
import ItemDetailsModal from './ItemDetailsModal';
import { getFuturEvents } from '../selectors/events';

const WishlistForm = (props) => {
  return (
    <div>
      <form>
        Wishlist Title: <input type="text" value={props.title} onChange={props.onChangeTitle}/><br/>
        <input type="radio" name="status" value="public" checked={props.status === "public"} onChange={props.onChangeStatus}/>Public
        <input type="radio" name="status" value="private" checked={props.status === "private"} onChange={props.onChangeStatus}/>Private <br/>

        Category:
         <select name="category" value={props.category} onChange={props.onChangeCategory}>
          <option value="no category">no category</option>
          <option value="books">books</option>
          <option value="video games">video games</option>
          <option value="tech">tech</option>
          <option value="software">software</option>
        </select> <br/>
        {props.events.length > 0 &&
          <div>
            <h4>{'Link the list to one of your futur events ?'}</h4>
            {getFuturEvents(props.events).map((ev, index) =>
              <div key={index}>
                <input
                  type="checkbox"
                  name="event"
                  value={ev.id}
                  id={ev.id}
                  onChange={props.onEventLink}
                />
                <label>{ev.title}</label>
              </div>
            )}
          </div>
        }

      </form>
      <form onSubmit={props.addItem}>
        <input type="text" name="element"/>
        <button>Add item</button>
      </form>
      {props.items.length > 0 &&
        <div>
          <h3>Your items:</h3>
          <ul>
            {props.items.map((item, index) =>
              <li key={index}>
                {item.name}
                <button onClick={() => props.openModalForItemUpdate(item.name)}>Update</button>
                <button onClick={() => props.deleteItem(item.id)}>Delete</button>
              </li>)}
          </ul>
          <button onClick={props.removeAllItems}>Remove all items</button>
      </div> }
      {props.error && <p>{props.error}</p>}
      <button disabled={props.title.trim() === "" || props.duplicateTitle}
        onClick={(wishlist) => props.onSaveWishlist({
          id: props.id,
          status: props.status,
          createdAt: props.createdAt,
          createdBy: props.uid,
          title: props.title,
          category: props.category,
          eventLinksIds:props.eventLinksIds,
          items: props.items
        }, props.operation, props.id, props.eventLinksIds, props.removedItemsIds)}>{'Save wishlist'}
      </button>
      <ItemDetailsModal
        showItemModal={props.showItemModal}
        closeItemModal={props.closeItemModal}
        itemInfoInit={props.itemInfoInit}
        updatingItem={props.updatingItem}
        onUpdateItem={props.onUpdateItem}
      />
    </div>
  )
}


export default WishlistForm;
