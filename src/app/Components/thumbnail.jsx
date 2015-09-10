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

  truncateTitle: function(title, n){
    n = n || 35;
    return (title.length < n) ? title : title.substring(0, 30) + "...";
  },

  render: function(){
    return (
      <div>
        <div className="book">
          <img className="book-img" src={this.props.book.details.MediumImage.URL}
        onClick={this.navToGiftDetail.bind(this, this.props.book.details.ASIN)}/>
        </div>
        <div className="book-title-thumb">{this.truncateTitle(this.props.book.details.ItemAttributes.Title)} </div>
      </div>
      );
  }
})

var mapStateToProps = function(state) {
  return {
    gift : state.gift // export the portion of the state from index.js Reducers
  }
};

export default connect(mapStateToProps)(Thumbnail);
