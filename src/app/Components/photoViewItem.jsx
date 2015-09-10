import React from 'react';
import { connect } from 'react-redux';

var PhotoViewItem = React.createClass({
  render: function(){

    console.log('Photo>>>>>>>>',this.props);

    return (
      <div className = "flex-container photo-view-item">

      </div>
    );
  },

});

export default PhotoViewItem;
