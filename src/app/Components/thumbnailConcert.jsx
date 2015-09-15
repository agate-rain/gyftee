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

      return (
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
});

var mapStateToProps = function(state) {
  return {
    gift : state.gift // export the portion of the state from index.js Reducers
  }
};

export default connect(mapStateToProps)(ThumbnailConcert);
