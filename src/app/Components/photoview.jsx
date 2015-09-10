import { connect } from 'react-redux';
import React from 'react';
import PORT from '../../config/port';
import PhotoViewItem from './photoViewItem';

var PhotoView = React.createClass({

  componentDidMount: function() {
  },

  render: function() {

    var photoItems = [];
    this.props.albums.forEach(function(album){
      photoItems.push(
          <PhotoViewItem album={album} key={album.id} />
      );
    })
    return (
      <div>
        {photoItems}
      </div>
    );
  }
});


export default PhotoView;
