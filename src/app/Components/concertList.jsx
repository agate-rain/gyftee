var React = require('react');
var Thumbnail = require('./thumbnail');
var Book = require('./book');
var Navigation = require('react-router').Navigation;
var Link = require('react-router').Link;
var sliderSettings = require('../../util/sliderSettings');

var Slider = require('react-slick');

var ConcertList = React.createClass({

  mixins: [ Navigation ],

  navToGiftDetail: function(id) {
    this.transitionTo(`/gifts/${id}`);
  },

  render: function() {
    var concerts = [];
    for(var key in this.props.amazonBooks){
      concerts.push(
        <div>
            <Thumbnail book={this.props.amazonBooks[key]} key={this.props.amazonBooks[key].ASIN} />
        </div>
      );
    }

    return (
      <div className="books-list">
      <h1>Concerts</h1>
      <Slider {...sliderSettings} className="concert-list">
      {concerts}
      </Slider>

      </div>
      );
  }
});

module.exports = ConcertList;
