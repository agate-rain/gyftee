import { connect } from 'react-redux';
import React from 'react';
import PORT from '../../config/port';
import WishListBook from './wishListBook';

var WishList = React.createClass({

  componentDidMount: function() {
  },

  render: function() {
    const {wishlist} = this.props;

    var wishListItems = [];
    for(var i = 0; i < wishlist.length; i++){
      wishListItems.push(
          <WishListBook book={wishlist[i]} key={wishlist[i].ASIN} />
      );
    }

    return (
      <div className="container wish-list-container">
        {wishListItems}
      </div>
    );
  }
});


export default WishList;
