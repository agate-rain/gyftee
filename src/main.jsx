require('./css/styles.css'); // add the css for all pages

var React         = require('react');
// var Reflux        = require('reflux');

// routing
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// view components
var Boot          = require('./app/views/boot');
var FriendManager = require('./app/views/friendManager');
var GiftDetail    = require('./app/views/giftDetail');
var GiftRecs      = require('./app/views/recommendedGifts');
// TODO GiftList View for each friend

// store
// TODO declare variable for store and require store module for the app

// TODO need a navigation component for all pages

// declare our routes and their hierarchy
var routes = (
  <Route handler={Main} >
    <DefaultRoute handler={Boot} />
    <Route name="login" path="/login" handler={Boot} />
    <Route name="friends" path="/friends" handler={FriendManager} >
      <Route name="friendGifts" path="/friends/:friendId" handler={GiftRecs} />
    </Route>
    <Route name="giftDetail" path="gifts/:giftId" hander={GiftDetail} />
  </Route>
);

var Main = React.createClass({
  render: function () {
    return (
      <RouteHandler/>
    );
  }
});

// <Route name="friendGiftList" path="/friends/:friendId/giftlist" handler={giftList} />


// use the HTML5 history API for cleaner URLs
Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
