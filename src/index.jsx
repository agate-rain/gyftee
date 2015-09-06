import 'babel-core/polyfill';
import './css/styles.css'; // add the css for all pages
import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import configStore from './app/Store/configStore';

// may need an App container???

// pages
var App           = require('./app/Containers/app');
var Login         = require('./app/Containers/login');
var FriendManager = require('./app/Containers/friendManager');
var GiftDetail    = require('./app/Containers/giftDetail');
var GiftRecs      = require('./app/Containers/recommendedGifts');
// TODO GiftList View for each friend

const history = new BrowserHistory();

// store
const store = configStore();

// react routes
// TODO add route for friendGiftList
// <Route name="friendGiftList" path="/friends/:friendId/giftlist" handler={giftList} />

React.render(
  <Provider store={store}>
  {() =>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route name="login" path="/login" component={Login} />
        <Route name="friends" path="/friends" component={FriendManager} />
        <Route name="friendGifts" path="/friends/:friendId" component={GiftRecs} />
        <Route name="giftDetail" path="/gifts/:giftId" component={GiftDetail} />
      </Route>
    </Router>
  }
  </Provider>,
  document.getElementById('app')
);
