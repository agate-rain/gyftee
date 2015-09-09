import React from 'react';
import { Link } from 'react-router';

var UserHeader = React.createClass({
  render: function() {
    console.log("this.props in UserHeader", this.props);
    return (
      <div className="flex-container welcome-main">
        <div className="welcome-container container">
          <div className="greeting-text proxima teal-font bold">Welcome, {this.props.user.name.split(" ")[0]}</div>
          <Link className="invite-link" to={`/friends/allfriends`}><div className="invite-button">INVITE FRIENDS</div></Link>
        </div>

        <div className="profile-photo-container">
          <div className="thumbnail profile-photo">
            <img src={this.props.user.picture} />
          </div>
        </div>
      </div>
    );
  }

});

export default UserHeader;
