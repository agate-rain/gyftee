import React from 'react';
import { Navigation, Link } from 'react-router';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import sliderSettings from '../../util/sliderSettings';
import Thumbnail from './thumbnail';

// shared component that replaces bookList and concertList
export default React.createClass({
  displayName: 'GiftsByCategory',
  mixins: [ Navigation ],

  handleClick: function() {
    if (this.state.open) {
      this.setState({open: false, class: "section"});
    } else {
      this.setState({open: true, class: "section open"});
    }
  },

  getInitialState: function() {
     return {open: true, class: "section open"}
  },

  render: function() {

    let categoryHeader;
    let element;

    if (this.props.concerts) {
      var concerts = [];
      for (var concert in this.props.concerts) {
        concerts.push(
          <div>
            <Thumbnail concert={this.props.concerts[concert]} key={this.props.concerts[concert].id} />
          </div>
        );
      }
      categoryHeader = (<div className="category-header">Concerts</div>);
      element = concerts;
    }
    else if (this.props.books) {
      var books = [];
      for (var key in this.props.books) {
        books.push(
          <div>
            <Thumbnail book={this.props.books[key]} key={this.props.books[key].ASIN} />
          </div>
        );
      }
      categoryHeader = (<div className="category-header">Books</div>);
      element = books;
    }

    return (
      <div className={this.state.class}>
        <div className="books-list">

          <div className="row light-teal category sectionhead" onClick={this.handleClick}>
            <button>toggle</button>
            {categoryHeader}
          </div>
            <div className="slider-container sliderwrap">
              <Slider {...sliderSettings} className="books-list slider">
                {element}
              </Slider>
            </div>
        </div>
      </div>
    );

  }

});
