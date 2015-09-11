import { connect } from 'react-redux';
import React from 'react';
import PORT from '../../config/port';

var RecommendPhotoView = React.createClass({

  componentDidMount: function() {
    var rand = Math.floor(Math.random() * this.props.albums.length) + 1;
    var randomAlbum = this.props.albums[rand];
    var randomPhoto = randomAlbum[0];
    console.log('Random Photo',randomPhoto);
    var imageURL = randomPhoto.source;
    this.getTags(imageURL)
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
      url: 'http://localhost:' + PORT.PORT + '/api/gifts/gettags/',
      method: 'POST',
      data: {imageURL : imageURL},
      success: function(data) {
        this.searchEtsy(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("NOT WORKING", xhr, status, err);
        //console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
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
