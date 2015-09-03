var React = require('react');

var UserHeader = React.createClass({
  render: function(){
    return (
      <div className="friend-info">
        <img className="friend-img" src={this.props.user.photo} />
        <div className="friend-name">{this.props.user.name}</div>
        <div className="friend-bday">{this.props.user.birthday}</div>
      </div>
    );
  }
});

module.exports = UserHeader;
