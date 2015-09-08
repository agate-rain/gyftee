var React = require('react');

var Book = React.createClass({
  addToList: function() {
    console.log("add to list clicked for the item ", this.props.book.ItemAttributes.Title);
    // send the clicked book to the server to save on the user's gift list
    // should the req object just be Book's rendered view? this.props.book[0]
  },

  componentDidMount: function() {
    console.log(JSON.stringify(this.props));
  },

  render: function() {

    const {book} = this.props;

    var missingBookCover = 'http://www.mbalit.co.uk/sites/default/files/imagecache/fullsize/imagefield_default_images/generic_book_cover_0.jpg';

    var bookDetails = {
      url: book.DetailPageURL || '',
      img: book.MediumImage.URL || missingBookCover,
      title: book.ItemAttributes.Title || 'NA',
      author: book.ItemAttributes.Author || 'NA',
      binding: book.ItemAttributes.Binding || 'NA',
      price: book.Offers.Offer.OfferListing.Price.FormattedPrice || 'NA'
    };

    return (
      <div className="container gift-detail-container">
        <div>
          <div className="add-to-list"><a href="#" onClick={this.addToList}><i className="glyphicon glyphicon-heart"></i></a></div>
          <div className="book-thumbnail"><a href={bookDetails.url}><img src={bookDetails.img} /></a></div>
        </div>

        <div className="book-title">{bookDetails.title}</div>

        <div className="book-author">{bookDetails.author}</div>
        <div className="book-binding">{bookDetails.binding}</div>
        <div className="book-price">{bookDetails.price}</div>

      </div>
    );
  }
});

module.exports = Book;
