var React = require('react');
var Route = require('react-router').Route;

import Main from 'components/main';
import Example from 'components/example';

var routes = (
  <Route handler={Main}>
    <Route name='example' handler={Example}/>
  </Route>
);

module.exports = routes;
