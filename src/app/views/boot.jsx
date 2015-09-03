var React = require('react');
var App = require('../components/app');
var Auth0 = require('../../config/auth0');

var Boot = React.createClass({
  render: function() {
    return (
      <App clientId={Auth0.AUTH0_CLIENT_ID} domain={Auth0.AUTH0_DOMAIN}></App>
    );
  }
});

module.exports = Boot;
