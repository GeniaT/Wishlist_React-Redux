import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';

const Event = (props) => {
  return (
    <div>
      <NavbarContainer />
      <h1>Check Event number {props.match.params.id}!</h1>
    </div>
  )
}


export default Event;
