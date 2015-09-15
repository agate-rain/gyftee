import React from 'react';
import Concert from '../Components/concert';
import NavBar from '../Components/navbar';
import { connect } from 'react-redux';

var ConcertDetail = React.createClass({

  render: function() {
    return (
      <div>
      <NavBar />
      <Concert concert={this.props.gift}/>
      </div>
    );
  }
});

var mapStateToProps = function(state) {
  return {
    gift : state.gift // export the portion of the state from index.js Reducers
  }
};

export default connect(mapStateToProps)(ConcertDetail);
