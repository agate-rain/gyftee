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
    var obj;
    var imageURL
    if(this.props.artist){
      obj = this.props.artist.filter(function(person){
        return person.name === this.props.concert.artists[0].name
      }.bind(this));
      imageURL = obj[0].thumb_url;
    }

    var datetime = this.props.concert.datetime.replace('T',' ');
    var date = datetime.slice(0,datetime.length - 9);
    var time = datetime.slice(datetime.length - 9, datetime.length-3);

    if(imageURL){
      return (
        <div>
          <div className="concert">
            <a className="concert" href={this.props.concert.ticket_url} target="_blank" className="concert-img"><img src={imageURL} onClick={this.navToConcertDetail.bind(this, this.props.concert.id)}/></a>
          </div>
          <div className="concert-title-thumb">{this.props.concert.artists[0].name} </div>
          <div className="concert-date-thumb">{date} </div>
          <div className="concert-time-thumb">{time} </div>
          <div className="concert-venue-name-thumb">{this.props.concert.venue.name} </div>
          <div className="concert-city-thumb">{this.props.concert.venue.city} </div>
          <div className="concert-country-thumb">{this.props.concert.venue.country} </div>
        </div>
        );
    }else{
      return (
        <div>
          Fetching concert...
        </div>
      );

    }
  }
});

var mapStateToProps = function(state) {
  return {
    gift : state.gift // export the portion of the state from index.js Reducers
  }
};

export default connect(mapStateToProps)(ThumbnailConcert);
