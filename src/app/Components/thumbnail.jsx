import React from 'react';
import { Navigation } from 'react-router';
import { connect } from 'react-redux';
import { currentDisplayedGift } from '../Actions/gift';

var Thumbnail = React.createClass({

  mixins: [ Navigation ],

  navToGiftDetail: function(id) {
    let item;
    if (this.props.book) {
      item = this.props.book;
    }
    if (this.props.concert) {
      item = this.props.concert;
    }
    if (this.props.etsy) {
      item = this.props.etsy;
    }
    this.props.dispatch(currentDisplayedGift(item));
    this.transitionTo(`/gifts/${id}`);
  },

  truncateTitle: function(title, n){
    n = n || 35;
    return (title.length < n) ? title : title.substring(0, 30) + "...";
  },

  render: function() {
    let element;
    if (this.props.book) {
      element = (
        <div>
          <div className="book">
            <img className="book-img" src={this.props.book.details.MediumImage.URL}
          onClick={this.navToGiftDetail.bind(this, this.props.book.details.ASIN)}/>
          </div>
          <div className="book-title-thumb">{this.truncateTitle(this.props.book.details.ItemAttributes.Title)} </div>
        </div>
      );
    }
    if (this.props.concert) {
      element = (
        <div className="concert-li-container container">
          <div className="concert-thumb-container">
            <a className="concert-link">
              <img className="book concert-thumb" src={this.props.concert.basedOn.thumb_url} onClick={this.navToGiftDetail.bind(this, this.props.concert.details.id)}></img>
            </a>
          </div>
          <div className="concert-details-container">
            <div className="concert-title">{this.props.concert.details.artists[0].name} </div>
          </div>
        </div>
      );
    }
    if (this.props.etsy) {
      element = (
        <div className="concert-li-container container">
          <div className="concert-thumb-container">
            <a className="concert-link">
              <img className="book concert-thumb" src={this.props.etsy.details.Images[0].url_570xN} onClick={this.navToGiftDetail.bind(this, this.props.etsy.details.listing_id)}></img>
            </a>
          </div>
          <div className="concert-details-container">
            <div className="concert-title">{this.truncateTitle(this.props.etsy.details.title)} </div>
          </div>
        </div>
      );
    }

    return element;
  }

});

var mapStateToProps = function(state) {
  return {
    gift : state.gift // export the portion of the state from index.js Reducers
  }
};

export default connect(mapStateToProps)(Thumbnail);
