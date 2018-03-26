import React from 'react';
import Navbar from './Navbar';

const Event = (props) => {
  return (
    <div>
      <Navbar />
      <h1>Check Event number {props.match.params.id}!</h1>
    </div>
  )
}


export default Event;
