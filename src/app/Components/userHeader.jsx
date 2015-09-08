import React from 'react';

var UserHeader = React.createClass({

  render: function() {
    return (
            <div className="flex-container welcome-main">
              <div className="welcome-container container">
                <div className="greeting-text proxima teal-font bold">Welcome, {this.props.user.name}</div>
                <Link className="invite-link" to={`/friends/allfriends`}><div className="invite-button">INVITE FRIENDS</div></Link>
              </div>

              <div className="profile-photo-container">
                <div className="thumbnail profile-photo">
                  <img src={this.props.user.pictureUrl} />
                </div>
              </div>
            </div>    
          );
  }

});

export default UserHeader;
