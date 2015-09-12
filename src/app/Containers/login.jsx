import React from 'react';
import App from '../Components/app';
import Auth0 from '../../config/auth0';

var Login = React.createClass({
  render: function() {
    return (
      <App clientId={Auth0.AUTH0_CLIENT_ID} domain={Auth0.AUTH0_DOMAIN}></App>
    );
  }
});

export default Login;
