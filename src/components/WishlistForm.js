import React from 'react';
import PropTypes from 'prop-types';
import ItemDetailsModalUpdate from './ItemDetailsModalUpdate';
import { getFuturEvents } from '../selectors/events';

const WishlistForm = (props) => {
  return (
    <div className="wishlistFormOutterContainer">
      <div className="wishlistFormInnerContainer">
      <h1>{props.title || 'New Wishlist...'}</h1>
        <form>
          Title: <br/>
          <input id="wishlistTitle" type="text" value={props.title} onChange={props.onChangeTitle}/><br/>
          {'Status of the Wishlist:'}<br/>
          <input type="radio" name="status" value="public" id="statusPublic" checked={props.status === "public"} onChange={props.onChangeStatus}/>Public<br/>
          <input type="radio" name="status" value="private"id="statusPrivate" checked={props.status === "private"} onChange={props.onChangeStatus}/>Private <br/>

          Category: <br/>
           <select name="category" value={props.category} onChange={props.onChangeCategory}>
            <option value="no category">no category</option>
            <option value="books">books</option>
            <option value="video games">video games</option>
            <option value="tech">tech</option>
            <option value="toys">toys</option>
            <option value="jewelry">jewelry</option>
            <option value="makeup">makeup</option>
            <option value="giftCard">giftCard</option>
            <option value="clothes">clothes</option>
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
        <form onSubmit={props.addItem} id="newItemForm">
          New item: <br/>
          <input type="text" name="element"/>
          <button className="btn btnAddItem">Add</button>
        </form>
        {props.items.length > 0 &&
          <div>
            <h3>Your items:</h3>
            <div>
              {props.items.map((item, index) =>
                <p key={index}>
                  <button className="btn" onClick={() => props.openModalForItemUpdate(item.name)}>Update</button>
                  <button className="btn" id="btnDelete" onClick={() => props.deleteItem(item.id)}>Delete</button>
                  {item.name}
                </p>)}
            </div>
            <button className="btn" id="btnRemoveAll" onClick={props.removeAllItems}>Remove all items</button>
        </div> }
        {props.error && <p>{props.error}</p>}
        <button className="btn" id="btnSaveForm" disabled={props.title.trim() === "" || props.duplicateTitle}
          onClick={(wishlist) => props.onSaveWishlist({
            id: props.id,
            status: props.status,
            createdAt: props.createdAt,
            createdBy: props.uid,
            title: props.title,
            category: props.category,
            items: props.items
          }, props.operation, props.id, props.eventLinksIds, props.removedItemsIds)}>{'Save'}
        </button>
        <ItemDetailsModalUpdate
          showItemModal={props.showItemModal}
          closeItemModal={props.closeItemModal}
          itemInfoInit={props.itemInfoInit}
          updatingItem={props.updatingItem}
          onUpdateItem={props.onUpdateItem}
        />
      </div>
    </div>
  )
}

WishlistForm.propTypes = {
  title: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  eventLinksIds: PropTypes.array,
  removedItemsIds: PropTypes.array,
  onSaveWishlist: PropTypes.func.isRequired,
  openModalForItemUpdate: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
  onEventLink: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  removeAllItems: PropTypes.func.isRequired,
}

export default WishlistForm;
