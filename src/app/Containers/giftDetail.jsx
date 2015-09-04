var React = require('react');
var Book = require('../Components/book');
var BOOK = require('../../../data/hardCoded');

var GiftDetail = React.createClass({

  render: function() {
    return (
      <div className="gift">
      <Book book={BOOK}/>
      </div>
    );
  }
});

module.exports = GiftDetail;
