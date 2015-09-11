import React from 'react';
import Thumbnail from './thumbnail';
import Book from './book';
import { Navigation, Link } from 'react-router';
import sliderSettings from '../../util/sliderSettings';
import Slider from 'react-slick';

var BookList = React.createClass({

  mixins: [ Navigation ],

  navToGiftDetail: function(id) {
    this.transitionTo(`/gifts/${id}`);
  },

  render: function() {
    var books = [];
    for(var key in this.props.amazonBooks){
      books.push(
        <div>
          <Thumbnail book={this.props.amazonBooks[key]} key={this.props.amazonBooks[key].ASIN} />
        </div>
      );
    }

    return (
      <div className="books-list margin-top">
        <div className="row light-teal category">
          <div className="category-header">Books</div>
        </div>
          <div className="slider-container">
            <Slider {...sliderSettings} className="books-list">
              {books}
            </Slider>
          </div>
      </div>

      );
  }
});

export default BookList;
