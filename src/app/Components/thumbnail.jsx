import React from 'react';
import { Navigation } from 'react-router';
import { connect } from 'react-redux';
import { currentDisplayedGift } from '../Actions/gift';

var Thumbnail = React.createClass({

  mixins: [ Navigation ],

  navToGiftDetail: function(id) {
    this.props.dispatch(currentDisplayedGift(this.props.book));
    this.transitionTo(`/gifts/${id}`);
  },

  render: function(){
    return (
      <div>
        <img className="book-img" src={this.props.book.details.MediumImage.URL} 
        onClick={this.navToGiftDetail.bind(this, this.props.book.details.ASIN)}/>
      </div>
      );
  }
});

module.exports = Thumbnail;

var mapStateToProps = function(state) {
  return {
    gift : state.gift // export the portion of the state from index.js Reducers
  }
};

export default connect(mapStateToProps)(Thumbnail);
