import React from 'react';
import Book from '../Components/book';
import { connect } from 'react-redux';

var GiftDetail = React.createClass({

  render: function() {
    return (
      <Book book={this.props.gift}/>
      
    );
  }
});

var mapStateToProps = function(state) {
  return {
    gift : state.gift // export the portion of the state from index.js Reducers
  }
};

export default connect(mapStateToProps)(GiftDetail);
