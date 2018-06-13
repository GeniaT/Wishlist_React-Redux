import React from 'react';

const FriendsList = (props) => {
  return (
    <div>
      <ul>
        {props.friends.map((friend, index) =>
          <li key={index}>
            {friend.name}
            <button onClick={() => {
              props.deleteFriendInStateAndDB(friend.id);
              props.updatePotentialFriendsInState(friend.id, 'delete', friend.name);
            }}>Delete</button>
          </li>)}
      </ul>
    </div>
  )
}


export default FriendsList;
