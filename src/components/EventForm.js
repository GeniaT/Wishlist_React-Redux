import React from 'react';
import moment from 'moment';
import ItemDetailsModal from './ItemDetailsModal';
import { SingleDatePicker } from 'react-dates';

const EventForm = (props) => {
  return (
    <div>
      <form>
        {'Event Title: '}<input type="text" value={props.title} onChange={props.onChangeTitle}/>
        <SingleDatePicker
          date={props.date}
          onDateChange={props.onDateChange}
          focused={props.focused}
          reopenPickerOnClearDate={props.reopenPickerOnClearDate}
          onFocusChange={props.onFocusChange}
        /><br/>
        <input type="radio" name="status" value="public" checked={props.status === "public"} onChange={props.onChangeStatus}/>Public
        <input type="radio" name="status" value="private" checked={props.status === "private"} onChange={props.onChangeStatus}/>Private <br/>

        {props.wishlists.length > 0 &&
          <div>
            <h4>{'Link the event to your wishlist ?'}</h4>
            {props.wishlists.map((list, index) =>
              <div key={index}>
                <input type="checkbox" name="choosewishlist" value={list.id} id={list.id} onChange={props.onWishlistLink}/>
                <label>{list.title}</label><br/>
              </div>
            )}
          </div>
        }
      </form>
      {'Wanted participants:'}<br/>
      <form onSubmit={props.addParticipant}>
        <input type="text" name="participant"/>
        <button>Add Participant</button><br/>
      </form>
      {props.participants.length !== 0 &&
        <div>
          <h3>{'Desired participants:'}</h3>
          <ul>
            {props.participants.map((participant, index) =>
              <li key={index}>
                {participant}
                <button onClick={() => props.deleteParticipant(participant)}>Delete</button>
              </li>)}
          </ul>
      </div> }
      {'Add another item to this event outside your linked wishlists?'}<br/>
      <form onSubmit={props.addItem}>
        <input type="text" name="element"/>
        <button>Add item</button>
      </form>
      {props.items.length > 0 &&
        <div>
          <h3>{'Your additional items outside your premade wishlists:'}</h3>
          <ul>
            {props.items.map((item, index) =>
              <li key={index}>
                {item.name}
                <button onClick={() => props.openModalForItemUpdate(item.name)}>Update</button>
                <button onClick={() => props.deleteItem(item.name)}>Delete</button>
              </li>)}
          </ul>
          <button onClick={props.removeAllItems}>Remove all items</button>
      </div> }
      {'Note about this event:'}<br/>
      <textarea
        rows="4"
        cols="50"
        name="note"
        value={props.note}
        onChange={props.onEventNote}
      >
      </textarea><br/>
    {props.error && <p>{props.error}</p>}
      <button disabled={props.title.trim() === "" || props.duplicateTitle}
        onClick={(ev) => props.onSaveEvent({
          id: props.id,
          status: props.status,
          createdAt: props.createdAt,
          title: props.title,
          participants: props.participants,
          items: props.items,
          note: props.note,
          wishlistLinksIds: props.wishlistLinksIds
        },props.operation ,props.id, props.wishlistLinksIds)}>{'Save Event'}
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

export default EventForm;
