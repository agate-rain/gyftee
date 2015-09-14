import React from 'react';
import { Navigation } from 'react-router';
import { connect } from 'react-redux';
import { currentDisplayedGift } from '../Actions/gift';

var ThumbnailConcert = React.createClass({

  mixins: [ Navigation ],

  navToGiftDetail: function(id) {
    this.props.dispatch(currentDisplayedGift(this.props.concert));
    this.transitionTo(`/concerts/${id}`);
  },

  truncateTitle: function(title, n){
    n = n || 35;
    return (title.length < n) ? title : title.substring(0, 30) + "...";
  },

  render: function(){

    var datetime = this.props.concert.details.datetime.replace('T',' ');
    var date = datetime.slice(0,datetime.length - 9);
    var time = datetime.slice(datetime.length - 9, datetime.length-3);

      return (
        <div className="concert-li-container container">

          <div className="concert-thumb-container">
            <a className="concert-link">
              <img className="book concert-thumb" src={this.props.concert.basedOn.thumb_url} onClick={this.navToGiftDetail.bind(this, this.props.concert.details.id)}></img>
            </a>
          </div>

          <div className="concert-details-container">
            <div className="concert-title">{this.props.concert.details.artists[0].name} </div>
            <div className="concert-date">{date} </div>
            <div className="concert-venue">{this.props.concert.details.venue.name} </div>
            <div className="concert-city">{this.props.concert.details.venue.city} </div>
          </div>

        </div>
      );
  }
});

            // <a className="concert-link" href={this.props.concert.details.ticket_url} target="_blank">

          // <a href={this.props.concert.basedOn.facebook_page_url}><button type="facebook_page_url">Facebook</button></a>
          // <a href={this.props.concert.basedOn.facebook_tour_dates_url}><button type="facebook_tour_date">Tourdate</button></a>
var mapStateToProps = function(state) {
  return {
    gift : state.gift // export the portion of the state from index.js Reducers
  }
};

export default connect(mapStateToProps)(ThumbnailConcert);
