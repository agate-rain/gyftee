var React = require('react');
var Thumbnail = require('./thumbnail');
var Book = require('./book');
var Navigation = require('react-router').Navigation;
var Link = require('react-router').Link;
var sliderSettings = require('../../util/sliderSettings');

var Slider = require('react-slick');

var BookList = React.createClass({

  mixins: [ Navigation ],

  handleClick: function(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: "section"
      });
    }else{
      this.setState({
        open: true,
        class: "section open"
      });
    }
  },

  getInitialState: function(){
     return {
       open: false,
       class: "section"
     }
  },

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
      <div className={this.state.class}>
        <div className="books-list">
          <div className="row light-teal category">
            <div className="category-header sectionhead" onClick={this.handleClick} >Books</div>
          </div>
            <div className="slider-container articlewrap">
              <Slider {...sliderSettings} className="books-list article">
                {books}
              </Slider>
            </div>
        </div>
      </div>
      );
  }
});

module.exports = BookList;
