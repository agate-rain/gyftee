import React from 'react';
import { Navigation } from 'react-router';
import { connect } from 'react-redux';
import { currentDisplayedGift } from '../Actions/gift';

var ThumbnailConcert = React.createClass({

  mixins: [ Navigation ],

  navToConcertDetail: function(id) {
    this.transitionTo(`/concert/${id}`);
  },

  render: function(){

    var datetime = this.props.concert.details.datetime.replace('T',' ');
    var date = datetime.slice(0,datetime.length - 9);
    var time = datetime.slice(datetime.length - 9, datetime.length-3);

      return (
        <div className="concert-li-container container">

          <div className="concert-thumb-container">
            <a className="concert-link" href={this.props.concert.details.ticket_url} target="_blank">
              <img className="book concert-thumb" src={this.props.concert.basedOn.thumb_url} onClick={this.navToConcertDetail.bind(this, this.props.concert.id)}></img>
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
          // <a href={this.props.concert.basedOn.facebook_page_url}><button type="facebook_page_url">Facebook</button></a>
          // <a href={this.props.concert.basedOn.facebook_tour_dates_url}><button type="facebook_tour_date">Tourdate</button></a>


export default ThumbnailConcert;
