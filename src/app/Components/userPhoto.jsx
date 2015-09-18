import React from 'react';
import { connect } from 'react-redux';

var UserPhoto = React.createClass({
  render: function(){
    return (
      <div className = "flex-container user-photo">
        <div className="container user-photo-thumbnail">
            <a className="user" href={this.props.photo.source}>
              <img className="user-photo-small" src={this.props.photo.source} />
            </a>
        </div>
      </div>
    );
  },

});

export default UserPhoto;
