import { connect } from 'react-redux';
import React from 'react';
import PORT from '../../config/port';

var RecommendPhotoView = React.createClass({

  componentDidMount: function() {
    var friendId = this.props.params.friendId;
    var rand = Math.floor(Math.random() * this.props.albums.length) + 1;
    var randomAlbum = this.props.albums[rand];
    var randomPhoto = randomAlbum[0];
    var imageURL = randomPhoto.source;
    this.getMovieList(friendId);
  },

  render: function() {

    // var photoItems = [];
    // this.props.albums.forEach(function(album){
    //   photoItems.push(
    //       <PhotoViewItem album={album} key={album.id} />
    //   );
    // })
    return (
      <div>
      </div>
    );
  },

  getTags: function(imageURL){
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/gettagsfromclarifai/',
      method: 'POST',
      data: {imageURL : imageURL},
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

  getMovieList : function(friendId) {
    // 126455562499
    var that = this;
    var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
    console.log(access_token)
    FB.api('/v2.4/' + friendId + '/movies',
            'GET',
            {"fields":"data,paging", "access_token": access_token},
            function(response) {
              console.log(">>>>>>>>>>>>>> Feed response",response);
              var movieid = response.data[0].id
              this.getPage(movieid);
              // that.getPage(response.data[0].id);
    }.bind(this));
  },

  getPage : function(pageId) {
    // 126455562499
    var access_token = JSON.parse(localStorage.getItem("access_token")).access_token;
    FB.api('/v2.4/' + pageId,
            'GET',
            {"fields":"affiliation,cover,description,features,about,artists_we_like,band_members,band_interests", "access_token": access_token},
            function(response) {
              console.log(">>>>>>>>>>>>>> Page response",response);
    });
  },

  searchEtsy: function(tagArr){
    $.ajax({
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/searchEtsy',
      method: 'POST',
      data: {tagArr : tagArr},
      success: function(data) {
        console.log('RESULT', data)
        //this.props.dispatch(saveGifts(gifts));
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("NOT WORKING", xhr, status, err);
        //console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  }


});


export default RecommendPhotoView;
