import React from 'react';
import Navbar from './navbar';
import UserHeader from './userHeader';
import Friend from './friend';
import { removeFriend } from '../Actions/user';
import { Navigation } from 'react-router';

var FriendList = React.createClass({

  mixins: [ Navigation ],

  navToGiftList: function(id) {
    this.transitionTo(`/friends/${id}`);
  },

  navToAllFriendList: function() {
    this.transitionTo(`/friends/allfriends`);
  },

// TODO: List birthdays in descending order
  render: function() {

    return (
      <div className='friend-list'>
        <Navbar />
        <UserHeader user={this.props.user} />

        <div className="bday-list-header">{this.props.appFriends.length} UPCOMING BIRTHDAYS</div>
          {
            this.props.appFriends.map(function(friend) {
              return (
                <Friend friend={friend} user={this.props.user} key={friend.id} onClick={this.navToGiftList.bind(this, friend.id)} />
              );

            }, this)
          }
      </div>
    );
  }

});

export default FriendList;
