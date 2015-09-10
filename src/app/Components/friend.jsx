import React from 'react';
import { Navigation } from 'react-router';
import { connect } from 'react-redux';

var Friend = React.createClass({

  mixins: [ Navigation ],

  formatDate: function(bday) {
    return bday.slice(0,5);
  },

  navToFriendWishList: function(id) {
    this.transitionTo(`/friends/${id}/wishlist`);
  },

  render: function() {

    if (this.props.friend.birthday) {
      var birthday = this.formatDate(this.props.friend.birthday);
    } else {
      birthday = "Unknown";
    }

    return (
      <div>
        <div className="bday-list-body seafoam">
          <div className="bday-row flex-container">
            <div className="heart-div"><i className="glyphicon glyphicon-heart heart" onClick={this.navToFriendWishList.bind(this, this.props.friend.id)}></i></div>
            <div className="bday-list-item friendname" onClick={this.props.onClick}>{this.props.friend.name} </div>
            <div className="date-container" onClick={this.props.onClick}>{birthday}</div>
          </div>
        </div>
      </div>
    );
  }
});

export default Friend;
