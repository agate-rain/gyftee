import React from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import Friend from './friend';
import { removeFriend } from '../Actions/user';
import Thumbnail from './thumbnail';

var GiftList = React.createClass({

  navToGift: function(id) {
    this.transitionTo(`/gifts/${id}`);
  },

  render: function() {

    var savedGifts = [];
    // this.props.amazonBooks.forEach(function(book) {
    //   savedGifts.push(<div><Thumbnail book={book} key={book.ASIN}
    //     onClick={this.navToGift.bind(this, book.ASIN) } /></div>);
    // }, this);

    return (
      <div className="gift-list">
      
      
      </div>
    );
  }
});

export default GiftList;
