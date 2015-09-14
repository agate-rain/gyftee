import React from 'react';
import Thumbnail from './thumbnail';
import Book from './book';
import { Navigation, Link } from 'react-router';
import sliderSettings from '../../util/sliderSettings';
import Slider from 'react-slick';

var BookList = React.createClass({

  mixins: [ Navigation ],

  handleClick: function(){
    if (this.state.open) {
      this.setState({open: false, class: "section"});
    } else {
      this.setState({open: true, class: "section open"});
    }
  },

  getInitialState: function(){
     return {open: true, class: "section open"}
  },

  // navToGiftDetail: function(id) {
  //   this.transitionTo(`/gifts/${id}`);
  // },

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
      <div className={this.state.class}>
        <div className="books-list">

          <div className="row light-teal category sectionhead" onClick={this.handleClick}>
            <button>toggle</button>
            <div className="category-header">Books</div>
          </div>
            <div className="slider-container sliderwrap">
              <Slider {...sliderSettings} className="books-list slider">
                {books}
              </Slider>
            </div>
        </div>
      </div>
      );
  }
});

export default BookList;
