import React from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { logOut } from '../actions/actions';

class NavbarContainer extends React.Component {
  render() {
    return (
      <Navbar
        loggedIn={this.props.loggedIn}
        logOut={this.props.logOut}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = {
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
