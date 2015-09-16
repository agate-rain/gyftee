import { connect } from 'react-redux';
import React from 'react';
import PORT from '../../config/port';
import { Button, Alert } from 'react-bootstrap';

// Component for the item that is rendered in the gift detail container
var GiftItem = React.createClass({
  addToList: function(giftId, type) {
    // send the clicked item to the server to save to the user's gift list
    var friendId = this.props.friend.friend.id;
    var userId = this.props.user.profile.identities[0].user_id;

    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/savegift",
      method: 'POST',
      data: {
              type: type,
              giftId : giftId,
              friendId : friendId,
              userId: userId
            },
      success: function(data) {
        console.log("gift item with id " + giftId + " added to wishlist");
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  componentDidMount: function() {
  },

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

  render: function() {

    let element;
    let giftType;
    let itemView;
    let itemThumbnail;
    let itemDetails;
    let basedOnDetails;
    let basedOn;

    if (this.state.alertVisible) {
      element = <Alert className="saved opacity" closeLabel="" onDismiss={this.handleAlertDismiss} dismissAfter={1000}>
        <span> Gift added! </span>
      </Alert>
    }

    if (this.props.book) {
      const {book} = this.props;
      giftType = 'book'
      basedOn = book.basedOn;
      const missingBookCover = 'http://www.mbalit.co.uk/sites/default/files/imagecache/fullsize/imagefield_default_images/generic_book_cover_0.jpg';

      if (book.details.Offers.Offer) {
        itemDetails = {
          giftId: book.details.ASIN,
          url: book.details.DetailPageURL || '',
          img: book.details.MediumImage.URL || missingBookCover,
          title: book.details.ItemAttributes.Title || 'NA',
          author: book.details.ItemAttributes.Author || 'NA',
          binding: book.details.ItemAttributes.Binding || 'NA',
          price: book.details.Offers.Offer.OfferListing.Price.FormattedPrice || 'NA',
          basedOn: book.basedOn.ItemAttributes.Title,
          isPrime: book.details.Offers.Offer.OfferListing.IsEligibleForPrime === "1",
        };
      } else {
        itemDetails = {
          giftId: book.details.ASIN,
          url: book.details.DetailPageURL || '',
          img: book.details.MediumImage.URL || missingBookCover,
          title: book.details.ItemAttributes.Title || 'NA',
          author: book.details.ItemAttributes.Author || 'NA',
          binding: book.details.ItemAttributes.Binding || 'NA',
          price: 'NA',
          basedOn: book.basedOn.ItemAttributes.Title,
          isPrime: 'NA'
        };
      }

      basedOnDetails = {
        img: basedOn.MediumImage.URL || missingBookCover,
        title: basedOn.ItemAttributes.Title || 'NA',
        author: basedOn.ItemAttributes.Author || 'NA',
      };

      itemThumbnail = (
        <div className="book-thumbnail">
          <a className="book" href={itemDetails.url} target="_blank"><img src={itemDetails.img} /></a>
        </div>
      );

      itemView = (
        <div>
          <div className="book-text-container">
            <div className="book-title">{itemDetails.title}</div>
            <div className="book-author">{itemDetails.author}</div>
            <div className="book-price">{itemDetails.price}</div>
            <div className="book-binding">{itemDetails.binding}</div>
          </div>

          {(() => {
            if (itemDetails.isPrime) {
              return (
                <img className ="prime-img" src="../../src/client/img/amazon-prime.png" />
              );
            }
          })()}

          <div className="based-on-container light-teal">
            <p className="based-on-text">Based on: {basedOnDetails.title}</p>
          </div>
        </div>
      );

    } // end if statement for book

    else if (this.props.concert) {
      const {concert} = this.props;
      giftType = 'music'
      var datetime = concert.details.datetime.replace('T',' ');
      var date = datetime.slice(0,datetime.length - 9);
      var time = datetime.slice(datetime.length - 9, datetime.length-3);
      var datetime = concert.details.datetime.replace('T',' ');

      basedOn = concert.basedOn;

      itemDetails = {
        giftId: concert.details.id
      };

      itemThumbnail = (
        <div>
          <a href={concert.details.ticket_url} target="_blank">
            <img className="concert-detail-thumb" src={basedOn.thumb_url}></img>
          </a>
        </div>
      );

      itemView = (
        <div>
          <div className="concert-details-container">
            <div className="concert-title">{this.props.concert.details.artists[0].name} </div>
            <div className="concert-date">{date} at {time}</div>
            <div className="concert-venue">{this.props.concert.details.venue.name} </div>
            <div className="concert-city">{this.props.concert.details.venue.city} </div>
          </div>
        </div>
      );
    }
    else if (this.props.etsy) {
      giftType = 'etsy';
      itemDetails = {
        giftId: this.props.etsy.details.listing_id
      };

      itemThumbnail = (
        <div>
          <a href={this.props.etsy.details.url} target="_blank">
            <img className="etsy-detail-thumb" src={this.props.etsy.details.Images[0].url_570xN}></img>
          </a>
        </div>
      );
      var etsyTag = [];
      this.props.etsy.details.tags.forEach(function(tag){
        etsyTag.push(tag + ', ');
      });
      var description = JSON.stringify(this.props.etsy.details.description).replace(/(?:[rn])+/g, "").replace(/(?:[*])+/g, "").replace(/(?:[_])+/g, "");
      console.log(description)

      itemView = (
        <div>
          <div className="concert-details-container">
            <div className="concert-title">{this.props.etsy.details.title} </div>
            <div className="concert-date">Price: ${this.props.etsy.details.price}</div>
            <div className="concert-date">Description: {description}</div>
            <div className="concert-venue">Quantity: {this.props.etsy.details.quantity} </div>
            <div className="concert-venue">Tags: {etsyTag} </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-container seafoam detail-main">
        <div className="detail-wrapper">

          <div>
            <div className="add-to-list-container">
              <div bsStyle="success" className="add-to-list" onClick={this.addToList.bind(this, itemDetails.giftId, giftType)}>
                <Button onClick={this.handleAlertShow} className="button add-to-list-button">
                  <a>
                    <i className="glyphicon add-heart glyphicon-heart"></i>
                  </a> ADD TO LIST
                </Button>
                <div>{element}</div>
              </div>
            </div>
            {itemThumbnail}
          </div>
          {itemView}

        </div>
      </div>
    );
  }

});

var mapStateToProps = function(state) {
  return {
    friend : state.friend, // export the portion of the state from index.js Reducers
    user : state.user
  }
};

export default connect(mapStateToProps)(GiftItem);
