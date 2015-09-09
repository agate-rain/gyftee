var React = require('react');
var Thumbnail = require('./thumbnail');
var Book = require('./book');
var Navigation = require('react-router').Navigation;
var Link = require('react-router').Link;

var Slider = require('react-slick');

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

    // define slider options
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }]
    };

    return (
      <div className="books-list">
      <div className="category-header">Books</div>
        <Slider {...settings} className="books-list">
        {books}
        </Slider>

      </div>
      );
  }
});

module.exports = BookList;
