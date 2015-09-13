import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import { Link } from 'react-router';
import { saveConcert } from '../Actions/friend';
import PORT from '../../config/port';
import Thumbnail from './thumbnail';
import ThumbnailConcert from './thumbnailConcert';
import Book from './book';
import Slider from'react-slick';
import sliderSettings from '../../util/sliderSettings';

var ConcertList = React.createClass({

  mixins: [ Navigation ],

  navToGiftDetail: function(id) {
    this.transitionTo(`/gifts/${id}`);
  },

  render: function() {
    // const {concerts} = this.props.concerts;

    if(this.props.concerts.length !== 0){
      var concerts = [];
      for(var concert in this.props.concerts){
        concerts.push(
          <div>
            <ThumbnailConcert concert={this.props.concerts[concert]} key={this.props.concerts[concert].id} />
          </div>
        );
      }
      return (
      <div className="books-list">
        <div className="row light-teal category">
          <div className="category-header">Concerts</div>
        </div>
          <div className="slider-container">
            <Slider {...sliderSettings} className="books-list">
              {concerts}
            </Slider>
          </div>
      </div>
      );
    }else{
    return (
      <div className="concerts-list">
        <div className="row light-teal category">
          <div className="category-header">Concerts</div>
        </div>
          <div className="slider-container">
            Fetching Concert...
          </div>
      </div>
      );
    }
  }
});


export default ConcertList;
