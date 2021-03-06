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
      categoryHeader = (<div className="category-header">Concerts <span className="category-count"> {concerts.length} </span></div>);
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
      categoryHeader = (<div className="category-header">Books <span className="category-count"> {books.length} </span> </div>);
      element = books;
    }
    else if (this.props.etsy) {
      var etsy = [];
      for (var key in this.props.etsy) {
        etsy.push(
          <div>
            <Thumbnail etsy={this.props.etsy[key]} key={this.props.etsy[key].listing_id} />
          </div>
        );
      }
      categoryHeader = (<div className="category-header">Etsy</div>);
      element = etsy;
    }

    if (element.length){
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
    } else {
      return (<div className={this.state.class}></div>);
    }


  }

});
