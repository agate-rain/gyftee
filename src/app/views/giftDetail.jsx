var React = require('react');
var Book = require('../components/book');
var BOOK = require('../../data/hardCoded');

var GiftDetail = React.createClass({

  render: function() {
    return (
      <div className="gift">
      <Book book={this.props.book}/>
      </div>
    );
  }
});

React.render(<GiftDetail book={BOOK}/>, document.getElementById('gift-detail'));
