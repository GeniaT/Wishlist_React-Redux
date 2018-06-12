import React from 'react';
import { connect } from 'react-redux';
import { startPotentialFriends, addFriend, startFriendAddition } from '../actions/friends';

class FriendsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initButtonClicked: false,
      friendsSearchInputValue: '',
    }
  }

  onfriendsSearchInputValueChange = (e) => {
    const friendsSearchInputValue = e.target.value;
    this.setState(() => ({friendsSearchInputValue: friendsSearchInputValue}));
  }

  render () {
    return (
      <div>
        <button onClick={() => {
          this.props.startPotentialFriends();
          this.setState({...this.state, initButtonClicked: true});
        }}>{'Search for a friend!'}</button>
        {this.state.initButtonClicked ? <input type="text" onChange={this.onfriendsSearchInputValueChange}/> : null}

        { this.state.friendsSearchInputValue !== "" &&
          <div>
          {'Click to add a friend:'}<br/>
            {this.props.suggestions.filter(i => i.name.toLowerCase().includes(this.state.friendsSearchInputValue.toLowerCase()))
            .map((item, index) => (
              <div onClick={(e) => {
                return new Promise ((resolve) => {
                  this.props.addFriend(item.id, item.name)
                }).then(this.props.startFriendAddition(item.id))

              }}
                key={index}>
                {item.name}
              </div>
            ))
          }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  suggestions: state.suggestions
})

const mapDispatchToProps = (dispatch) => ({
  startPotentialFriends: () => dispatch(startPotentialFriends()),
  addFriend: (id, name) => dispatch(addFriend(id, name)),
  startFriendAddition: (id) => dispatch(startFriendAddition(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsSearch);
