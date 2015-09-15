import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import { Link } from 'react-router';
import { saveConcert } from '../Actions/friend';
import PORT from '../../config/port';
import Thumbnail from './thumbnail';
import ThumbnailConcert from './thumbnailConcert';
import Book from './book';
import Concert from './concert';

import sliderSettings from '../../util/sliderSettings';
import Slider from'react-slick';

var ConcertList = React.createClass({

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

    if(this.props.concerts){
      var concerts = [];
      for (var concert in this.props.concerts){
        concerts.push(
          <div>
            <ThumbnailConcert concert={this.props.concerts[concert]} key={this.props.concerts[concert].id} />
          </div>
        );
      }

      return (
        <div className={this.state.class}>

          <div className="books-list">

          <div className="row light-teal category sectionhead" onClick={this.handleClick}>
            <button>toggle</button>
            <div className="category-header">Concerts</div>
          </div>
            <div className="slider-container sliderwrap">
              <Slider {...sliderSettings} className="books-list slider">
                {concerts}
              </Slider>
            </div>
          </div>
        </div>
      );
    } else {
    return (
      <div className="concerts-list">
        <div className="row light-teal category">
          <div className="category-header">Concerts</div>
        </div>
          <div className="slider-container">
            Fetching Concerts...
          </div>
      </div>
      );
    }
  }
});


export default ConcertList;
