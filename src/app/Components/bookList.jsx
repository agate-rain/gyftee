var React = require('react');
var Thumbnail = require('./thumbnail');
var Book = require('./book');
var Navigation = require('react-router').Navigation;
var Link = require('react-router').Link;
var sliderSettings = require('../../util/sliderSettings');

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

    return (
      <div className="books-list">
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
