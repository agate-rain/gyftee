var React = require('react');

var UserHeader = React.createClass({

  render: function(){
    if(this.props.user.friend !== null){
      console.log(this.props.url)
      return (
      <div className="friend-info">
        <img className="friend-img" src={this.props.url} />
        <div className="friend-name">{this.props.user.friend[0].name}</div>
        <div className="friend-bday">{this.props.user.friend[0].birthday}</div>
      </div>
      );
    }else{
      return (
        <div className="friend-info">
          Fetching friend...
        </div>
      );
    }
  },

  getInitialState: function() {
    return { user: []}
  },

  componentDidMount: function() {
  },
});

module.exports = UserHeader;
