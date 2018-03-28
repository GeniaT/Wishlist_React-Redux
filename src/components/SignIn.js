import React from 'react';
import Navbar from './Navbar';

const SignIn = (props) => (
    <div>
      <Navbar />
      <h1>Sign In Page</h1>
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
        <input
          type="text"
          placeholder="Email"
        />
      </form>

    </div>
)

export default SignIn;
