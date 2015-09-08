var React = require('react');

var Book = React.createClass({
  addToList: function() {
    console.log("add to list clicked for the item ", this.props.book.ItemAttributes.Title);
    // send the clicked book to the server to save on the user's gift list
    // should the req object just be Book's rendered view? this.props.book[0]
  },

  componenetDidMount: function() {
    console.log(JSON.stringify(this.props));
  },

  render: function() {
    return (
      <div className="container gift-detail-container">
        <div>
          <div className="add-to-list"><a href="#" onClick={this.addToList}><i className="glyphicon glyphicon-heart"></i></a></div>
          <div className="book-thumbnail"><a href={this.props.book.DetailPageURL}><img src={this.props.book.MediumImage.URL} /></a></div>
        </div>

        <div className="book-title">{this.props.book.ItemAttributes.Title}</div>

        <div className="book-author">{this.props.book.ItemAttributes.Author}</div>
        <div className="book-binding">{this.props.book.ItemAttributes.Binding}</div>


      </div>
    );
  }


  /* <div className="book-price">{this.props.book.Offers.Offer.OfferListing.Price.FormattedPrice}</div> */

/*  render: function() {
    return (
      <div className="container gift-detail-container">
      </div>
    );
  }*/
});

module.exports = Book;
