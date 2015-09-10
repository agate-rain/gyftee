import React from 'react';
import Book from '../Components/book';
import NavBar from '../Components/navbar';
import { connect } from 'react-redux';

var GiftDetail = React.createClass({

  render: function() {
    return (
      <div>
      <NavBar />
      <Book book={this.props.gift}/>
      </div>
    );
  }
});

var mapStateToProps = function(state) {
  return {
    gift : state.gift // export the portion of the state from index.js Reducers
  }
};

export default connect(mapStateToProps)(GiftDetail);
