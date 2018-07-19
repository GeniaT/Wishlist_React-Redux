# Wishlist App

We all struggle when thinking about what gifts would interest my friends or family.
This app is an attempt to make your life a bit easier by:<br>
:page_with_curl: listing the wish lists of your friends <br>
:calendar: creating events and add wish lists and other items to it<br>
:convenience_store: give enough information about each item to make it easy to find and order the item

## Tools used for this app

Languages: JS(ES6), JSX & CSS/SCSS<br>
<img src="https://image.slidesharecdn.com/4-es6metbabel-150513100342-lva1-app6891/95/es6-with-babeljs-1-638.jpg?cb=1431511634" alt="ES6" width="200px" height="100px"/><img src="https://cdn-images-1.medium.com/max/1200/1*G6rj2IevhkL3hxDWdFX9cg.png" alt="JSX" width="200px" height="100px"/><img src="https://appendto.com/wp-content/uploads/2016/05/css3-420x210.jpg" alt="CSS" width="200px" height="100px"/>

Main libraries: React, Redux, React Router & Firebase for authentication and CRUD operations <br>
<img src="http://www.jsweet.org/wp-content/uploads/2016/04/react-logo-300x289.png" alt="React" width="200px" height="100px"/><img src="https://react-etc.net/files/2018-03/redux-harmful.png" alt="Redux" width="200px" height="100px"/><img src="https://cdn-images-1.medium.com/max/1200/1*TKvlTeNqtkp1s-eVB5Hrvg.png" alt="React-Router" width="200px" height="100px"/><img src="https://cdn-images-1.medium.com/max/2000/0*DigfG6xRmNAuJ2To.png" alt="Firebase" width="200px" height="100px"/>

Additional useful libraries: <a href="https://momentjs.com/">moment</a>, <a href="https://github.com/airbnb/react-dates">react-dates</a><br>
Deployment: <a href="https://www.heroku.com/">Heroku</a><br>
Bundler: <a href="https://webpack.js.org/">Webpack</a><br>
Testing: <a href="https://facebook.github.io/jest/">Jest</a>

## The app is deployed.
If interested, you can test the app by logging to it and creating some lists on https://wishlistss.herokuapp.com/ <br>

## Main features:
:page_with_curl: Create a detailed wishlist with ability to link it to existing event.<br>
:calendar: Create a detailed event with ability to add participants to it + link it to wishlists.<br>
:bookmark_tabs: Add additional items to an event outside existing wishlists.<br>
:couple: Add friends so I can see their wishlists.<br>
:negative_squared_cross_mark: Book items inside an event I am participating to so people don't buy same things.<br>
Controls are in place so the creator of the event doesn't see items booked for him and people can't book/unbook something that has been booked by someone else. <br>
:clock130: All this information is synced with DB and updated in almost real-time (perfect real-time doesn't exist they say :smirk:)<br>
