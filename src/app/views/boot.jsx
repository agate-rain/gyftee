var React = require('react');
var App = require('../components/app');
var Auth0 = require('../../config/auth0');

React.render(<App clientId={Auth0.AUTH0_CLIENT_ID} domain={Auth0.AUTH0_DOMAIN} />,
  document.getElementById('login-page'));
