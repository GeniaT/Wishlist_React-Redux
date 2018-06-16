import React from 'react';
import { connect } from 'react-redux';
import {
  startPotentialFriends,
  addFriendInStateAndDB,
  updatePotentialFriendsInState
} from '../actions/friends';

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

        { this.state.friendsSearchInputValue !== "" && this.props.suggestions.length > 0 &&
          <div>
          {'Click to add a friend:'}<br/>
            {this.props.suggestions.filter(i => i.name.toLowerCase().includes(this.state.friendsSearchInputValue.toLowerCase()))
            .map((item, index) => (
              <div onClick={() => {
                this.props.addFriendInStateAndDB(item.id, item.name);
                this.props.updatePotentialFriendsInState(item.id, 'add', item.name);
              }}
                key={index}>
                {item.name}
              </div>
            ))
          }
          </div>
        }
        {this.state.friendsSearchInputValue !== "" && this.props.suggestions.length === 0 &&
        <div>{'No suggestions for your input, sorry!'}</div>
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
  addFriendInStateAndDB: (id, name) => dispatch(addFriendInStateAndDB(id, name)),
  updatePotentialFriendsInState: (id, operation, name) => dispatch(updatePotentialFriendsInState(id, operation, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsSearch);
