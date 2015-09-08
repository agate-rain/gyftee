import React from 'react';
import Book from '../Components/book';
import { connect } from 'react-redux';
import { BOOK } from '../../../data/hardCoded';

var GiftDetail = React.createClass({

  render: function() {
    return (
      <div className="gift">
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
