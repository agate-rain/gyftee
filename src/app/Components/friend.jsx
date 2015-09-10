import React from 'react';
import { Navigation } from 'react-router';
import { connect } from 'react-redux';
import PORT from '../../config/port.js';

var Friend = React.createClass({

  mixins: [ Navigation ],

  getInitialState: function() {
    return {
      giftList: {},
      hasWishList: false
    };
  },

  componentDidMount: function(){
    //console.log("USER ------->", this.props.user);
    var userId = this.props.user.identities[0].user_id;
    var friendId = this.props.friend.id;
    var url = "http://localhost:" + PORT.PORT + "/api/friends/getwishlist/"+friendId+"/"+userId;

    $.ajax({
      url: url,
      method: 'GET',
      success: function(data) {
        if(this.isMounted()){
          this.setState({
            giftList: data
          });
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  formatDate: function(bday) {
    return bday.slice(0,5);
  },

  navToFriendWishList: function(id) {
    this.transitionTo(`/friends/${id}/wishlist`);
  },

  navToImageView: function(id){
    this.transitionTo(`/friends/${id}/image`);
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
          <div className="heart-div">
          {(()=>{
            var giftList = this.state.giftList;
            for (var list in giftList){
              if (giftList[list].length){
                return <i className="glyphicon glyphicon-heart heart" onClick={this.navToFriendWishList.bind(this, this.props.friend.id)}></i>;
              }
            }
          })()}
            </div>
            <div className="bday-list-item friendname" onClick={this.props.onClick}>{this.props.friend.name} </div>
            <div className="date-container" onClick={this.props.onClick}>{birthday}</div>
          </div>
        </div>
      </div>
    );
  }
});


var mapStateToProps = function(state) {
  return {
    profile: state.user.profile,
  }
};

export default connect(mapStateToProps)(Friend);
