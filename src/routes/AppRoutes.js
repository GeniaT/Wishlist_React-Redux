import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import MyEvents from '../components/MyEvents';
import CreateWishlist from '../components/CreateWishlist';
import CreateEvent from '../components/CreateEvent';
import WrongPage from '../components/WrongPage';
import UpdateWishlist from '../components/UpdateWishlist';
import UpdateEvent from '../components/UpdateEvent';
import Wishlist from '../components/Wishlist';
import Event from '../components/Event';
import SignIn from '../components/SignIn';
import LogIn from '../components/LogIn';

import WishlistFormContainer from '../containers/WishlistFormContainer';

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact={true}/>
      <Route path="/create-wishlist" component={WishlistFormContainer}/>
      <Route path="/create-event" component={CreateEvent}/>
      <Route path="/displayWishlist/:id" component={Wishlist}/>
      <Route path="/updateWishlist/:id" component={WishlistFormContainer}/>
      <Route path="/updateEvent/:id" component={UpdateEvent}/>
      <Route path="/my-events" component={MyEvents}/>
      <Route path="/event/:id" component={Event}/>
      <Route path="/SignIn" component={SignIn}/>
      <Route path="/LogIn" component={LogIn}/>
      <Route component={WrongPage}/>
    </Switch>
  </BrowserRouter>
)


export default AppRoutes;
