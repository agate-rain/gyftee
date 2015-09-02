var React = require('react');
var App = require('../components/app.jsx');
var AUTH0_CLIENT_ID = require('../../config/auth0').AUTH0_CLIENT_ID;
var AUTH0_DOMAIN = require('../../config/auth0').AUTH0_DOMAIN;

React.render(<App clientId={AUTH0_CLIENT_ID} domain={AUTH0_DOMAIN} />,
  document.getElementById('login-page'));
