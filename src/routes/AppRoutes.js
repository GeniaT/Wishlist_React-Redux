import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import WrongPage from '../components/WrongPage';
import WishlistDisplay from '../components/WishlistDisplay';
import EventDisplay from '../components/EventDisplay';
import LogIn from '../components/LogIn';
import WishlistFormContainer from '../containers/WishlistFormContainer';
import EventFormContainer from '../containers/EventFormContainer';
import EventsContainer from '../containers/EventsContainer';
import friendsWishlistsContainer from '../containers/friendsWishlistsContainer';

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact={true}/>
      <Route path="/create-wishlist" component={WishlistFormContainer}/>
      <Route path="/create-event" component={EventFormContainer}/>
      <Route path="/displayWishlist/:id" component={WishlistDisplay}/>
      <Route path="/updateWishlist/:id" component={WishlistFormContainer}/>
      <Route path="/displayEvent/:id" component={EventDisplay}/>
      <Route path="/updateEvent/:id" component={EventFormContainer}/>
      <Route path="/my-events" component={EventsContainer}/>
      <Route path="/event/:id" component={Event}/>
      <Route path="/LogIn" component={LogIn}/>
      <Route path="/friendsWishlists" component={friendsWishlistsContainer}/>
      <Route component={WrongPage}/>
    </Switch>
  </BrowserRouter>
)


export default AppRoutes;
