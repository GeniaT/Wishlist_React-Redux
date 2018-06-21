import React from 'react';
import PropTypes from 'prop-types';

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

FriendsList.propTypes = {
  deleteFriendInStateAndDB: PropTypes.func.isRequired,
  updatePotentialFriendsInState: PropTypes.func.isRequired,
  friends: PropTypes.array.isRequired,
}

export default FriendsList;
