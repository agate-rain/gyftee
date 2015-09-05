import React from 'react';
import { connect } from 'react-redux';
import Friend from './friend';
import { removeFriend } from '../Actions/user';

var FriendList = React.createClass({

  clickHandler: function(id) {
    this.props.dispatch(removeFriend(id));
  },

  render: function() {
    return (
      <div className='friend-list'>
        {
          this.props.appFriends.map(function(friend) {

            return (
              <Friend friend={friend} key={friend.id} onClick={this.clickHandler.bind(this, friend.id)}/>
            );

          }, this)
        }
      </div>
    );
  }

});

export default connect()(FriendList);
