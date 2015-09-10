import 'babel-core/polyfill';
import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import configStore from './app/Store/configStore';

// containers
import App from './app/Containers/app';
import Login from './app/Containers/login';
import FriendManager from './app/Containers/friendManager';
import GiftDetail from './app/Containers/giftDetail';
import GiftRecs from './app/Containers/giftRecommendations';
import AllFriendsList from './app/Containers/allFriendsList';
import InviteFriend from './app/Containers/inviteFriend';
import WishList from './app/Containers/pinnedGiftList';

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
      <Route name="root" path="/" component={App}>
        <Route name="login" path="/login" component={Login} />
        <Route name="friends" path="/friends" component={FriendManager} />
        <Route name="allFriendsList" path="/friends/allfriends" component={AllFriendsList} />
        <Route name="inviteFriend" path="/friends/invite/:friendId" component={InviteFriend} />
        <Route name="wishList" path="/friends/:friendId/wishList" component={WishList} />
        <Route name="friendGifts" path="/friends/:friendId" component={GiftRecs} />
        <Route name="giftDetail" path="/gifts/:giftId" component={GiftDetail} />
      </Route>
    </Router>
  }
  </Provider>,
  document.getElementById('app')
);
