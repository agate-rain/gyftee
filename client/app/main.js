var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div className="nav">
        <Link to="app">Home</Link>
        <Link to="login">Login</Link>
        <Link to="logout">Logout</Link>
        {/* this is the importTant part */}
        <RouteHandler/>
      </div>
    );
  }
});

// break out routes into smaller modules?
// var routes = require('./routes');

var routes = (
  <Route name="app" path="/" handler={app}>
    <Route name="login" path="/login" component={boot}/>
    <Route name="welcome" path="/welcome" component={friendManager}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(<Handler/>, document.body);
});
