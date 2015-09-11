import React from 'react';
import { connect } from 'react-redux';

var WishListBook = React.createClass({
  render: function(){

    console.log('BOOK>>>>>>>>',this.props.book);

    var missingBookCover = 'http://www.mbalit.co.uk/sites/default/files/imagecache/fullsize/imagefield_default_images/generic_book_cover_0.jpg';

    var bookDetails = {
      ASIN : this.props.book.ASIN || '',
      url: this.props.book.DetailPageURL || '',
      img: this.props.book.MediumImage.URL || missingBookCover,
      title: this.props.book.ItemAttributes.Title || 'NA',
      author: this.props.book.ItemAttributes.Author || 'NA',
      binding: this.props.book.ItemAttributes.Binding || 'NA',
      price: this.props.book.Offers.Offer.OfferListing.Price.FormattedPrice || 'NA'
    };

    return (
      <div className="detail-wrapper pinned-gift">
          <div className="add-to-list-container">
            <div className="add-to-list">
              <button className="add-to-list-button">
                <a href="#">
                  <i className="glyphicon add-heart glyphicon-heart"></i>
                </a> REMOVE FROM WISH LIST
              </button>
            </div>
          </div>
        <div>
            <div className="book-thumbnail">
              <a className="book" href={bookDetails.url}><img src={bookDetails.img} /></a>
            </div>
        </div>

          <div className="book-text-container">
            <div className="book-title">{bookDetails.title}</div>
            <div className="book-author">{bookDetails.author}</div>
            <div className="book-price">{bookDetails.price}</div>
            <div className="book-binding">{bookDetails.binding}</div>
          </div>
      </div>
    );
  },

});

export default WishListBook;
