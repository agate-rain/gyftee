import { connect } from 'react-redux';
import React from 'react';
import PORT from '../../config/port';

var WishList = React.createClass({

  componentDidMount: function() {
  },

  render: function() {
    const {wishlist} = this.props;
    console.log(this.props)

    // var wishListItems = [];
    // for(var i = 0; i < wishlist.length; i++){
    //   wishListItems.push(
    //     <div>
    //       <Thumbnail book={wishlist.Item} key={this.props.amazonBooks[key].ASIN} />
    //     </div>
    //   );
    // }

    wishlist.forEach(function(item){
      // console.log(item);
    });
    return (
      <div className="container wish-list-container">
      </div>
    );
  }
});

var mapStateToProps = function(state) {
  return {

  }
};

export default connect(mapStateToProps)(WishList);
