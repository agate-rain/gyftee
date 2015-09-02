var React = require('react');

var Thumbnail = React.createClass({

  render: function(){
    return (
        <img className="book-img" src={this.props.book.MediumImage.URL}/>
      );
  }
});

module.exports = Thumbnail;
