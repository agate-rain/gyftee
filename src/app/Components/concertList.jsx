import React from 'react';
import Thumbnail from './thumbnail';
import Book from './book';
import { Navigation } from 'react-router';
import { Link } from 'react-router';
import Slider from'react-slick';
import sliderSettings from '../../util/sliderSettings';

var ConcertList = React.createClass({

  mixins: [ Navigation ],

  navToGiftDetail: function(id) {
    this.transitionTo(`/gifts/${id}`);
  },

  render: function() {
    var concerts = [];

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
  }
});

export default ConcertList;
