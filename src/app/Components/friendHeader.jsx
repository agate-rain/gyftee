import React from 'react';
import { formatDate } from '../Utils/utils';

var FriendHeader = React.createClass({

  render: function() {
    if (this.props.friend !== null && this.props.url !== null) {
      return (
      <div className="friend-info">
        <div className="friend-header-container container flex-container">
          <div className="friend-header-part">
            <div className="friend-header-name">{this.props.friend.name}</div>
            <div className="friend-header-bday">{formatDate(this.props.friend.birthday)}</div>
            <div className="friend-header-name">
              <div className="button filter-button"
                onClick={this.props.navToWishList.bind(this, this.props.friend.id)}>
                WISHLIST
              </div>
            </div>
          </div>

          <div className="friend-header-part profile-photo-container">
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
            <p className="fetching-friend"> Fetching friend...</p>
          </div>
        );
      }
  },

});

export default FriendHeader;
