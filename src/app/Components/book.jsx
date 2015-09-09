import { connect } from 'react-redux';
import React from 'react';
import PORT from '../../config/port';

var Book = React.createClass({
  addToList: function(ASIN) {
    // send the clicked book to the server to save on the user's gift list
    // should the req object just be Book's rendered view? this.props.book[0]

    var friendId = this.props.friend.friend[0].id;
    var userId = this.props.user.profile.identities[0].user_id;

    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/savegift",
      method: 'POST',
      data: {ASIN : ASIN,
            friendId : friendId,
            userId: userId}, // need to pass in the access token
      success: function(data) {
        alert(data);
        // = JSON.parse(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  componentDidMount: function() {
  },

  render: function() {

    const {book} = this.props;

    var basedOn = book.basedOn;

    var missingBookCover = 'http://www.mbalit.co.uk/sites/default/files/imagecache/fullsize/imagefield_default_images/generic_book_cover_0.jpg';

    var bookDetails = {
      ASIN : book.details.ASIN,
      url: book.details.DetailPageURL || '',
      img: book.details.MediumImage.URL || missingBookCover,
      title: book.details.ItemAttributes.Title || 'NA',
      author: book.details.ItemAttributes.Author || 'NA',
      binding: book.details.ItemAttributes.Binding || 'NA',
      price: book.details.Offers.Offer.OfferListing.Price.FormattedPrice || 'NA',
      basedOn: book.basedOn.ItemAttributes.Title,
      isPrime: book.details.Offers.Offer.OfferListing.IsEligibleForPrime === "1",
    };

    var basedOnDetails = {
      img: basedOn.MediumImage.URL || missingBookCover,
      title: basedOn.ItemAttributes.Title || 'NA',
      author: basedOn.ItemAttributes.Author || 'NA',
    };

    return (
      <div className="flex-container seafoam detail-main">

        <div className="detail-wrapper">
          <div>
            <div className="add-to-list-container">
              <div className="add-to-list">
                <button className="add-to-list-button">
                  <a href="#" onClick={this.addToList.bind(this, bookDetails.ASIN)}>
                    <i className="glyphicon add-heart glyphicon-heart"></i>
                  </a> ADD TO LIST
                </button>
              </div>
            </div>

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

            <div className="based-on-container light-teal">
              <p className="based-on-text">Based on: {basedOnDetails.title}</p>
            </div>

        </div>
      </div>
    );
  }
});
          // {(() => {
          //   if (bookDetails.isPrime){
          //     return (
          //       <div className="prime-eligible">
          //         <img className ="prime-img" src="https://b1.burst.zone/wp-content/uploads/2014/03/amazon-prime-logo.jpg" />
          //       </div>
          //       );
          //   }
          // })()}

var mapStateToProps = function(state) {
  return {
    friend : state.friend, // export the portion of the state from index.js Reducers
    user : state.user
  }
};

export default connect(mapStateToProps)(Book);
