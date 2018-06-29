import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import ItemDetailsModalUpdate from './ItemDetailsModalUpdate';

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

      {props.friends.length > 0 &&
        <div>
          {'Wanted friends:'}<br/>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" name="participant" onChange={props.onParticipantInputValueChange}/>
          </form>
          { props.participantInputValue !== "" &&
            <div>
            {
              props.friends.filter(i => i.name.toLowerCase().includes(props.participantInputValue.toLowerCase())).length > 0 &&
              <div>{'Click to add a participant:'}<br/>
                {props.friends.filter(i => i.name.toLowerCase().includes(props.participantInputValue.toLowerCase()))
                .map((item, index) => (
                  <div onClick={(e) => {
                    props.addParticipant(e, item.name, item.id);
                  }}
                    key={index}>
                    {item.name}
                  </div>
                ))
              }</div>
            }
            </div>
          }
          {props.friends.filter(i => i.name.toLowerCase().includes(props.participantInputValue.toLowerCase())).length === 0 &&
            <div>{'No friends to add with such input, sorry!'}</div>
          }
          {props.participants.length !== 0 &&
            <div>
              <h3>{'Desired participants:'}</h3>
              <ul>
                {props.participants.map((participant, index) =>
                  <li key={index}>
                    {participant.name}
                    <button onClick={() => props.deleteParticipant(participant)}>Delete</button>
                  </li>)}
              </ul>
          </div>}
        </div>
    }
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
                <button onClick={() => props.deleteItem(item.id)}>Delete</button>
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
          createdBy: props.uid,
          date: String(props.date),
          title: props.title,
          participants: props.participants,
          items: props.items,
          note: props.note,
        },props.operation ,props.id, props.wishlistLinksIds, props.removedItemsIds, props.removedParticipantsIds)}>{'Save Event'}
      </button>
      <ItemDetailsModalUpdate
        showItemModal={props.showItemModal}
        closeItemModal={props.closeItemModal}
        itemInfoInit={props.itemInfoInit}
        updatingItem={props.updatingItem}
        onUpdateItem={props.onUpdateItem}
      />
    </div>
  )
}

EventForm.propTypes = {
  date: PropTypes.object,
  operation: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  wishlistLinksIds: PropTypes.array,
  removedItemsIds: PropTypes.array,
  removedParticipantsIds: PropTypes.array,
  onSaveEvent: PropTypes.func.isRequired,
  openModalForItemUpdate: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onWishlistLink: PropTypes.func.isRequired,
  onParticipantInputValueChange: PropTypes.func.isRequired,
  deleteParticipant: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  removeAllItems: PropTypes.func.isRequired,
  onEventNote: PropTypes.func.isRequired,
}

export default EventForm;
