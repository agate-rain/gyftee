import React from 'react';
import { connect } from 'react-redux';
import PORT from '../../config/port';
import { Button, Alert } from 'react-bootstrap';

var WishListBook = React.createClass({
  // enables the fading alert upon pinning item to wishlist
  getInitialState: function() {
    return {
      alertVisible: false
    };
  },

  handleAlertDismiss: function() {
    this.setState({alertVisible: false});
  },

  handleAlertShow: function() {
    this.setState({alertVisible: true});
  },



  render: function(){


    var missingBookCover = 'http://www.mbalit.co.uk/sites/default/files/imagecache/fullsize/imagefield_default_images/generic_book_cover_0.jpg';

    if(this.props.book.Offers.Offer){
      var bookDetails = {
        ASIN : this.props.book.ASIN || '',
        url: this.props.book.DetailPageURL || '',
        img: this.props.book.MediumImage.URL || missingBookCover,
        title: this.props.book.ItemAttributes.Title || 'NA',
        author: this.props.book.ItemAttributes.Author || 'NA',
        binding: this.props.book.ItemAttributes.Binding || 'NA',
        price: this.props.book.Offers.Offer.OfferListing.Price.FormattedPrice || 'NA'
      };
    }else{
      var bookDetails = {
        ASIN : this.props.book.ASIN || '',
        url: this.props.book.DetailPageURL || '',
        img: this.props.book.MediumImage.URL || missingBookCover,
        title: this.props.book.ItemAttributes.Title || 'NA',
        author: this.props.book.ItemAttributes.Author || 'NA',
        binding: this.props.book.ItemAttributes.Binding || 'NA',
        price: 'NA'
      };
    }


    // remove element confirmation
    let element;
    if (this.state.alertVisible) {
      element = <Alert className="saved opacity" onDismiss={this.handleAlertDismiss} dismissAfter={2000}>
        <span>ITEM REMOVED!</span>
      </Alert>
    }

    return (
      <div className="detail-wrapper pinned-gift">
          <div className="add-to-list-container">
            <div className="add-to-list" onClick={this.props.removeItem.bind(this, bookDetails.ASIN)}>
                <Button onClick={this.handleAlertShow} className="add-to-list-button">
                  <a>
                    <i className="glyphicon add-heart glyphicon-heart"></i>
                  </a> REMOVE FROM LIST
                </Button>
                 <div>{element}</div>
            </div>
          </div>
        <div>
            <div className="book-thumbnail">
              <a className="book fadeIn" href={bookDetails.url} target="_blank"><img src={bookDetails.img} /></a>
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
