import React from 'react';

var FriendHeader = React.createClass({

  formatDate: function(bday) {
    return bday.slice(0,5);
  },

  render: function(){

    if(this.props.user.friend !== null){
      console.log(this.props.url)
      return (
      <div className="friend-info">
        <div className="friend-header-container container flex-container">
          <div>
            <div className="friend-header-name">{this.props.user.friend[0].name}</div>
            <div className="friend-header-bday">{this.formatDate(this.props.user.friend[0].birthday)}</div>
            <div>
              <button className="filter-button">WISHLIST</button> 
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

  getInitialState: function() {
    return { user: []}
  }

});

export default FriendHeader;
