import React from 'react';
import Navbar from './Navbar';

const LogIn = (props) => (
    <div>
      <Navbar />
      <h1>Log In Page</h1>
      <form>
      <input
          type="text"
          placeholder="Name"
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
        />
      </form>

    </div>
)

export default LogIn;
