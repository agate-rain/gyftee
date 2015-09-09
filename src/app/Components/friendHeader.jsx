import React from 'react';

var FriendHeader = React.createClass({

  formatDate: function(bday) {
    return bday.slice(0,5);
  },

  render: function(){

    // var birthday = this.formatDate(this.props.user.friend[0].birthday);

    if(this.props.user.friend !== null){
      console.log(this.props.url)
      return (
      <div className="friend-info">
        <img className="friend-img" src={this.props.url} />
        <div className="friend-name">{this.props.user.friend[0].name}</div>
        <div className="friend-bday">{this.formatDate(this.props.user.friend[0].birthday)}</div>
      </div>
      );
    }else{
      return (
        <div className="friend-info">
          Fetching friend...
        </div>
      );
    }
  },

  getInitialState: function() {
    return { user: []}
  }

});

export default FriendHeader;
