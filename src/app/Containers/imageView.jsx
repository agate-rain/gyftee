import React from 'react';
import PORT from '../../config/port';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import { fetchFriend } from '../Actions/friend';
import { Promise } from 'bluebird';
import NavBar from '../Components/navbar';
import PhotoView from '../Components/photoview'
import RecommendPhotoView from '../Components/recommendPhotoView'


var ImageView = React.createClass({

  mixins: [ Navigation ],

  componentDidMount: function() {
    var friendId = window.location.href.split('/')[4];
    this.fetchFriendById(friendId);
  },

  render: function() {
    if(this.state){
      return (
        <div className="container image-view-container">
          <NavBar />
          <RecommendPhotoView albums={this.state.imageArr}/>
        </div>
      );
    }else{
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

  assembleImage : function(){
    var albumArr = this.props.friend.friend.albums.data;
    ////////////////////////////////////////////////////////////////////
    var promises = [];
    var resultImageArr;

    var fetchImageSync = function(albumId){
      var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
      return new Promise(function(resolve, reject){
        FB.api('/v2.4/' + albumId + '/photos',
            'GET',
            {"fields":"source,url,message,place", "access_token": access_token}, function(result) {
              // if(err !== null){
              //   return reject(err);
              // }
              resolve(result);
            });
      });
    };

    albumArr.forEach(function(album){
      promises.push(fetchImageSync(album.id));
    });

    Promise.all(promises).then(function(result){
      return result = result.map(function(item){
        return item.data.map(function(photo){
          return photo;
        });
      });
    }).then(function(result){
      resultImageArr = result;
      this.setState({imageArr : resultImageArr});
    }.bind(this));

    /////////////////////////////////////////////////////


    // var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
    // albumArr.forEach(function(album){
    //   this.getImage(album.id,access_token);
    // }.bind(this));
  },
  getImage : function(albumId) {
    // 126455562499
    var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
    FB.api('/v2.4/' + albumId + '/photos',
            'GET',
            {"fields":"source,url,message,place", "access_token": access_token},
            function(response) {
              response.data.forEach(function(photo){
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

export default connect(mapStateToProps)(ImageView);

  // fetchAlbum : function(friendId){
  //   var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
  //   FB.api('/v2.4/' + friendId + '/albums',
  //           'GET',
  //           {"fields":"name,location,id,message,privacy,place", "access_token": access_token},
  //           function(response) {
  //             console.log(response);
  //   });
  // },
