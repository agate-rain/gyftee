import React from 'react';
import PORT from '../../config/port';
import WishListBook from './wishListBook';
import { formatDate } from '../Utils/utils';

var WishList = React.createClass({

  componentDidMount: function() {
  },

  render: function() {
    console.log('props', this.props);
    var friend = this.props.friend.friend;
    var url = this.props.friend.image_url;

    var wishListItems = [];
    for(var i = 0; i < this.props.wishlist.length; i++){
      wishListItems.push(
          <WishListBook book={this.props.wishlist[i]} key={this.props.wishlist[i].ASIN} />
      );
    }

    return (
      <div className="flex-container">
        <div className="giftlist-main container">

          <div className="container flex-container">
            <div className="wishlist-header">
              <div className="friend-header-name">{friend.name}</div>
              <div className="friend-header-bday">{formatDate(friend.birthday)}</div>
            </div>

            <div className="wishlist-header profile-photo-container">
              <div className="thumbnail profile-photo">
                <img src={url} />
              </div>
            </div>

            <div className="wishlist-header container">
              <div className="container giftlist-circle"><text>{this.props.wishlist.length}</text></div>
            </div>
          </div>{/* flex-container of friend info */}

          <div className="giftlist-header row light-teal">Saved Gifts</div>

          <div className="flex-container pinned-gifts">
            {wishListItems}
          </div>

        </div>{/* giftlist-main container */}
      </div>// flex-container
    );
  }
});


export default WishList;
