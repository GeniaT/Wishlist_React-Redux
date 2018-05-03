import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';

const SignIn = (props) => (
    <div>
      <NavbarContainer />
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
        <button>Sign In</button>
      </form>
    </div>
)

export default SignIn;
