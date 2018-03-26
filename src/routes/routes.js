import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from '../components/List';
import MyEvents from '../components/MyEvents';
import CreateWishlist from '../components/CreateWishlist';
import WrongPage from '../components/WrongPage';
import Wishlist from '../components/Wishlist';
import Event from '../components/Event';

const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={List} exact={true}/>
      <Route path="/create-wishlist" component={CreateWishlist}/>
      <Route path="/wishlist/:id" component={Wishlist}/>
      <Route path="/my-events" component={MyEvents}/>
      <Route path="/event/:id" component={Event}/>
      <Route component={WrongPage}/>
    </Switch>
  </BrowserRouter>
)


export default routes;
