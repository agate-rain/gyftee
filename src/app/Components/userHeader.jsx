var React = require('react');

var UserHeader = React.createClass({

  render: function(){
    // if(this.props !== undefined){
    //   return (
    //   <div className="friend-info">
    //     <img className="friend-img" src={this.props.user.name} />
    //     <div className="friend-name">{this.props.user.name}</div>
    //     <div className="friend-bday">{this.props.user.birthday}</div>
    //   </div>
    //   );
    // }
    return (
      <div className="friend-info">
        Fetching friend...
      </div>
    );
  },

  getInitialState: function() {
    return { user: []}
  },

  componentDidMount: function() {
  },
});

module.exports = UserHeader;
