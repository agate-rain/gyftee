import React from 'react';
import { Link } from 'react-router';
import PORT from '../../config/port.js';
import { fetchFriend} from '../Actions/friend';
import utils from '../Utils/utils';

var UserHeader = React.createClass({

  getInitialState: function() {
    return {
      image_url: ''
    };
  },

  componentDidMount: function(){
    $.ajax({
      url: "http://" + PORT.HOST + ":" + PORT.PORT + "/api/friends/image",
      method: 'POST',
      data: {friendId : this.props.user.identities[0].user_id,
             access_token: JSON.parse(localStorage.getItem('access_token')).access_token}, // need to pass in the access token
      success: function(data) {
        if(this.isMounted()){
          this.setState({
            image_url: data
          })
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://" + PORT.HOST + ":" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  render: function() {
    return (
      <div className="flex-container welcome-main">
        <div className="welcome-container container">
          <div className="greeting-text proxima teal-font bold slideDown">Welcome, {this.props.user.name.split(" ")[0]}</div>
          <Link className="invite-link" to={`/friends/invite`}>
            <div className="button invite-button slideDown">INVITE FRIENDS</div>
          </Link>
        </div>

        <div className="profile-photo-container" >
          <div className="thumbnail profile-photo slideLeft">
            <img src={this.state.image_url} />
          </div>
        </div>
      </div>
    );
  }

});

export default UserHeader;
