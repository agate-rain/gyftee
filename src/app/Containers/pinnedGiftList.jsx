import React from 'react';
import { connect } from 'react-redux';
import { BOOK } from '../Components/book';

var PinnedGiftList = React.createClass({

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

export default connect(mapStateToProps)(PinnedGiftList);
