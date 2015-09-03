var React = require('react');

var BookList = React.createClass({

  render: function() {

    var books = [];
    this.props.data.forEach(function(book) {
      books.push(<div><Thumbnail book={book} key={book.ASIN}/></div>);
    });

    // define slider options
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [{
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
        <h1> Books </h1>
        <Slider {...settings} className="books-list">
          {books}
        </Slider>
      </div>
    );
  }
});

module.exports = BookList;
