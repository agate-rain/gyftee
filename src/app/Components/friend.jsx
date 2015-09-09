var React = require('react');

var Friend = React.createClass({

  formatDate: function(bday) {
    return bday.slice(0,5);
  },

  render: function() {

    var birthday = this.formatDate(this.props.friend.birthday);

    return (
      <div onClick={this.props.onClick}>

      <div className="bday-list-body seafoam">
        <div className="bday-row flex-container">
          <div className="heart-div"><a href="#"><i className="glyphicon glyphicon-heart heart"></i></a></div>
          <div className="bday-list-item friendname">{this.props.friend.name} </div>
          <div className="date-container">{birthday}</div>
        
      </div>

      </div>
    </div>
    );
  }
});

module.exports = Friend;
