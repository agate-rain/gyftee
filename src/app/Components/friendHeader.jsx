import React from 'react';
import { formatDate } from '../Utils/utils';

var FriendHeader = React.createClass({

  DaysToBirthday: function(mmddBirthday){
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();

    var mdy = mmddBirthday.split("/");

    var upcomingBday = new Date(currentYear, mdy[0]-1, mdy[1]);

    if (upcomingBday < currentDate){
      upcomingBday = new Date(currentYear+1, mdy[0]-1, mdy[1]);
    }

    return parseInt((upcomingBday-currentDate)/(1000*60*60*24));

  },

  render: function() {

    if (this.props.friend !== null && this.props.url !== null) {

      return (
      <div className="friend-info">
        <div className="friend-header-container container flex-container">
          <div className="friend-header-part">
            <div className="friend-header-name slideDown">{this.props.friend.name}</div>
            <div className="friend-header-bday slideDown">{formatDate(this.props.friend.birthday)} - {this.DaysToBirthday(this.props.friend.birthday)} days</div>
            <div className="friend-header-name">
              <div className="button filter-button slideRight"
                onClick={this.props.navToWishList.bind(this, this.props.friend.id)}>
                WISHLIST
              </div>
            </div>
          </div>

          <div className="friend-header-part profile-photo-container">
            <div className="thumbnail profile-photo slideLeft">
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
