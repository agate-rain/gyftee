import React from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import Friend from './friend';
import { removeFriend } from '../Actions/user';
import { Navigation } from 'react-router';
import FilterableFriends from './filterableFriends';

var FacebookFriend = React.createClass({
  //displays facebook friend using app when searching for facebook friends
  mixins: [ Navigation ],

  render: function() {
    console.log(this.props.friend);
    return (
      <div className='all-friend-row'>
        <div onClick={this.inviteFriend.bind(this, this.props.friend.id)} className="invite-fb-friend">INVITE</div>
        <div className='friend-name'>{this.props.friend.name}</div>
      </div>
    );
  },


  inviteFriend: function(id) {
    this.transitionTo(`/friends/invite/${id}`);
  },
});

export default FacebookFriend;
