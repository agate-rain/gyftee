import React from 'react';
import GiftItem from '../Components/giftItem';
import NavBar from '../Components/navbar';
import { connect } from 'react-redux';

var GiftDetail = React.createClass({
  render: function() {
    let giftType; 

    if (this.props.gift.category === 'book') {
      giftType = (<GiftItem book={this.props.gift} />)
    } 
    else if (this.props.gift.category === 'concert') {
      giftType = (<GiftItem concert={this.props.gift} />) 
    }

    return (
      <div>
        <NavBar />
        {giftType}
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
