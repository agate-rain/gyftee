import React from 'react';
import PORT from '../../config/port';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import { fetchFriend } from '../Actions/friend';
import { Promise } from 'bluebird';
import NavBar from '../Components/navbar';
import PhotoView from '../Components/photoview'
import RecommendPhotoView from '../Components/recommendPhotoView'


var ImageClassify = React.createClass({

  mixins: [ Navigation ],

  componentDidMount: function() {
    var friendId = window.location.href.split('/')[4];
    this.fetchFriendById(friendId);
  },

  render: function() {
    if (this.state) {
      return (
        <div className="container image-view-container">
          <NavBar />
          <RecommendPhotoView albums={this.state.imageArr}/>
        </div>
      );
    } else {
      return (
        <div className="container image-view-container">
          <NavBar />
          Fetching Photo...
        </div>
      );
    }
  },
  // put back into line 25 <PhotoView albums={this.state.imageArr}/>
  // <RecommendPhotoView albums={this.state.imageArr}/>

  fetchFriendById: function(friendId) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/friends/" + friendId,
      method: "POST",
      data: {access_token: JSON.parse(localStorage.getItem("access_token")).access_token},
      // need to pass in the access token
      dataType: "json",
      success: function(data) {
        console.log('FRIEND FROM SERVER', data);
        this.props.dispatch(fetchFriend(data));
        this.assembleImage();
        // this.fetchAlbum(this.props.friend.friend.id);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  assembleImage : function() {
    var albumArr = this.props.friend.friend.albums.data;

    var promises = [];
    var resultImageArr;

    var fetchImageSync = function(albumId){
      var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
      return new Promise(function(resolve, reject){
        FB.api('/v2.4/' + albumId + '/photos',
            'GET',
            {
              "fields":"source,url,message,place",
              "access_token": access_token
            }, function(result) {
              resolve(result);
            });
      });
    };

    albumArr.forEach(function(album) {
      promises.push(fetchImageSync(album.id));
    });

    Promise.all(promises).then(function(result) {
      return result = result.map(function(item) {
        return item.data.map(function(photo) {
          return photo;
        });
      });
    }).then(function(result) {
      resultImageArr = result;
      this.setState({imageArr : resultImageArr});
      this.getTags(resultImageArr);
    }.bind(this));
  },

  getTags: function(imageArr) {
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/gettagsfrommetamind/',
      method: 'POST',
      data: {imageArr : imageArr},
      success: function(data) {
        console.log(data);
        // this.searchEtsy(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("NOT WORKING", xhr, status, err);
        //console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  getImage : function(albumId) {
    var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
    FB.api('/v2.4/' + albumId + '/photos',
      'GET',
      {"fields":"source,url,message,place", "access_token": access_token},
      function(response) {
        response.data.forEach(function(photo) {
          console.log(photo.source)
        });
    });
  }
});

var mapStateToProps = function(state) {
  return {
    profile: state.user.profile,
    friends: state.user.friends,
    friend: state.friend
  }
};

export default connect(mapStateToProps)(ImageClassify);
