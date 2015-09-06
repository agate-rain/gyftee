import React from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import Friend from './friend';
import { removeFriend } from '../Actions/user';
import { Navigation } from 'react-router';

var FriendList = React.createClass({

  mixins: [ Navigation ],

  // clickHandler: function(id) {
  //   this.props.dispatch(removeFriend(id));
  // },

  navToGiftList: function(id) {
    this.transitionTo(`/friends/${id}`);
  },

  render: function() {
    return (
      <div className='friend-list'>
      <Navbar />
        {
          this.props.appFriends.map(function(friend) {

            return (
              <div>
                <Friend friend={friend} key={friend.id} onClick={this.navToGiftList.bind(this, friend.id)}/>
              </div>
            );

          }, this)
        }
      </div>
    );
  }

});
                // <button onClick={this.clickHandler.bind(this, friend.id)}>Remove</button>

export default connect()(FriendList);
