import React from 'react';
import { connect } from 'react-redux';
import UserPhoto from './userPhoto'

var PhotoViewItem = React.createClass({
  render: function(){
    var photoArr = []
    this.props.album.forEach(function(photoItem){
      photoArr.push(
        <UserPhoto photo={photoItem} key={photoItem.id}/>
      );
    });

    return (
      <div className = "photo-view-item">
        {photoArr}
      </div>
    );
  },

});

export default PhotoViewItem;
