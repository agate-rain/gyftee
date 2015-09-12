import React from 'react';
import { Link } from 'react-router';
import PORT from '../../config/port.js';
import { connect } from 'react-redux';
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
      url: "http://localhost:" + PORT.PORT + "/api/friends/image",
      method: 'POST',
      data: {friendId : this.props.user.identities[0].user_id,
             access_token: JSON.parse(localStorage.getItem('access_token')).access_token}, // need to pass in the access token
      success: function(data) {
        if(this.isMounted()){
          this.props.dispatch(saveImageUrl(data))
          this.setState({
            image_url: data
          })
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });


  },

  render: function() {
    console.log(this.props)
    return (
      <div className="flex-container welcome-main">
        <div className="welcome-container container">
          <div className="greeting-text proxima teal-font bold">Welcome, {this.props.user.name.split(" ")[0]}</div>
          <Link className="invite-link" to={`/friends/invite`}><div className="invite-button">INVITE FRIENDS</div></Link>
        </div>

        <div className="profile-photo-container">
          <div className="thumbnail profile-photo">
            <img src={this.state.image_url} />
          </div>
        </div>
      </div>
    );
  }

});

var mapStateToProps = function(state) {
  return {
    profile: state.user.profile
  }
};


export default connect(mapStateToProps)(UserHeader);
