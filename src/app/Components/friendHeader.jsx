import React from 'react';
import { Navigation } from 'react-router';
import { formatDate } from '../Utils/utils';

var FriendHeader = React.createClass({

  mixins: [ Navigation ],

  navToWishList: function(friendId) {
    this.transitionTo(`/friends/${friendId}/wishList`);
  },

  render: function() {
    if (this.props.friend !== null && this.props.url !== null) {
      return (
      <div className="friend-info">
        <div className="friend-header-container container flex-container">
          <div>
            <div className="friend-header-name">{this.props.friend.name}</div>
            <div className="friend-header-bday">{formatDate(this.props.friend.birthday)}</div>
            <div>
              <button className="filter-button" onClick={this.navToWishList.bind(this, this.props.friend.id)}>WISHLIST</button>

            </div>
          </div>

          <div className="profile-photo-container">
            <div className="thumbnail profile-photo">
              <img src={this.props.url} />
            </div>
          </div>

        </div>
      </div>
      );

    } else {
        return (
          <div className="friend-info">
            Fetching friend...
          </div>
        );
      }
  },

});

export default FriendHeader;
