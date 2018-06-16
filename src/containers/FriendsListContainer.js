import React from 'react';
import { connect } from 'react-redux';
import FriendsList from '../components/FriendsList';
import { deleteFriendInStateAndDB, updatePotentialFriendsInState } from '../actions/friends';

class FriendsListContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //
    // }
  }

  render () {
    return (
      <div>
        <FriendsList
          deleteFriendInStateAndDB={this.props.deleteFriendInStateAndDB}
          updatePotentialFriendsInState={this.props.updatePotentialFriendsInState}
          friends={this.props.friends}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  friends : state.friends,
})

const mapDispatchToProps = (dispatch) => ({
  deleteFriendInStateAndDB: (id) => dispatch(deleteFriendInStateAndDB(id)),
  updatePotentialFriendsInState: (id, operation, name) => dispatch(updatePotentialFriendsInState(id, operation, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsListContainer);
