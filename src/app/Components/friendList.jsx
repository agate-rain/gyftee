import React from 'react';
import UserHeader from './userHeader';
import Friend from './friend';
import { removeFriend } from '../Actions/user';

var FriendList = React.createClass({

  //What is this for again?
  navToAllFriendList: function() {
    this.transitionTo(`/friends/invite`);
  },

  render: function() {
    return (
      <div className='friend-list'>
        <UserHeader user={this.props.user} />

        <div className="bday-list-header slideRight">
          {this.props.appFriends.length} UPCOMING BIRTHDAYS
        </div>
          {
            this.props.appFriends.map(function(friend) {
              return (
                <Friend friend={friend} user={this.props.user} key={friend.id}
                  onClick={this.props.navToFriendRecs.bind(this, friend.id)} />
              );
            }, this)
          }
      </div>
    );
  }

});

export default FriendList;
