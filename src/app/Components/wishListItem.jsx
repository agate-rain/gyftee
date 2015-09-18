import React from 'react';
import { connect } from 'react-redux';
import PORT from '../../config/port';
import { Button, Alert } from 'react-bootstrap';

var WishListItem = React.createClass({
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

  if(this.props.book){
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
            <div className="add-to-list" onClick={this.props.removeItem.bind(this, bookDetails.ASIN, 'book', this.props.book)}>
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
  }else if(this.props.music){
    var musicDetails = {
        giftId: this.props.music.giftId || '',
        url: this.props.music.url || '',
        img: this.props.music.thumbnail || missingBookCover,
        title: this.props.music.concertTitle || 'NA',
        date: this.props.music.date || 'NA',
        time: this.props.music.time || 'NA',
        venue: this.props.music.venue || 'NA',
        city: this.props.music.city || 'NA',
      };

    let element;
    if (this.state.alertVisible) {
      element = <Alert className="saved opacity" onDismiss={this.handleAlertDismiss} dismissAfter={2000}>
        <span>ITEM REMOVED!</span>
      </Alert>
    }

    return (
      <div className="detail-wrapper pinned-gift">
          <div className="add-to-list-container">
            <div className="add-to-list" onClick={this.props.removeItem.bind(this, musicDetails.giftId,'music', this.props.music)}>
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
              <a className="book fadeIn" href={musicDetails.url} target="_blank"><img src={musicDetails.img} /></a>
            </div>
        </div>

          <div className="book-text-container">
            <div className="book-title">{musicDetails.title}</div>
            <div className="book-author">{musicDetails.date}</div>
            <div className="book-author">{musicDetails.time} PM</div>
            <div className="book-price">{musicDetails.venue}</div>
            <div className="book-price">{musicDetails.city}</div>
          </div>
      </div>
    );

  }else if(this.props.etsy){
    var etsyDetails = {
        giftId: this.props.etsy.giftId || '',
        url: this.props.etsy.url || '',
        img: this.props.etsy.thumbnail || missingBookCover,
        title: this.props.etsy.title || 'NA',
        price: this.props.etsy.price || 'NA',
        basedOnKeyWord: this.props.etsy.basedOnKeyword || 'NA',
        basedOnPhoto1: this.props.etsy.basedOnPhoto[0] || '',
        basedOnPhoto2: this.props.etsy.basedOnPhoto[1] || ''
      };

    let element;
    if (this.state.alertVisible) {
      element = <Alert className="saved opacity" onDismiss={this.handleAlertDismiss} dismissAfter={2000}>
        <span>ITEM REMOVED!</span>
      </Alert>
    }

    return (
      <div className="detail-wrapper pinned-gift">
          <div className="add-to-list-container">
            <div className="add-to-list" onClick={this.props.removeItem.bind(this, etsyDetails.giftId, 'etsy', this.props.etsy)}>
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
              <a className="book fadeIn" href={etsyDetails.url} target="_blank"><img src={etsyDetails.img} /></a>
            </div>
        </div>

          <div className="book-text-container">
            <div className="book-title">{etsyDetails.title}</div>
            <div className="book-author">${etsyDetails.price}</div>
            <div className="book-author">Key Words: {etsyDetails.basedOnKeyWord}</div>
          </div>
      </div>
    );

  }
}

});

export default WishListItem;
