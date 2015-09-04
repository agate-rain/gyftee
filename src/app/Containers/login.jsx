var React = require('react');
var App = require('../Components/app');
var Auth0 = require('../../config/auth0');

var Login = React.createClass({
  render: function() {
    return (
      <App clientId={Auth0.AUTH0_CLIENT_ID} domain={Auth0.AUTH0_DOMAIN}></App>
    );
  }
});

module.exports = Login;
