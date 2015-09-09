import { connect } from 'react-redux';
import React from 'react';
import PORT from '../../config/port';

var WishList = React.createClass({

  componentDidMount: function() {
  },

  render: function() {
    const {wishlist} = this.props;
    console.log(wishlist);

    wishlist.forEach(function(item){
      console.log(item);
    });
    return (
      <div className="container wish-list-container">
      </div>
    );
  }
});

var mapStateToProps = function(state) {
  return {

  }
};

export default connect(mapStateToProps)(WishList);
