import React from 'react';
import PORT from '../../config/port';
import WishListBook from './wishListBook';
import { formatDate } from '../Utils/utils';
import { connect } from 'react-redux';
import { fetchFriend, saveImageUrl} from '../Actions/friend';
import utils from '../Utils/utils';

var WishList = React.createClass({

  componentDidMount: function() {
    var friendId = window.location.href.split('/')[4];
    utils.fetchFriendById(friendId, function(friend){
      this.props.dispatch(fetchFriend(friend));
    }.bind(this));

    utils.fetchImageUrlById(friendId, function(image){
      this.props.dispatch(saveImageUrl(image));
    }.bind(this));
  },

  render: function() {
    console.log('props', this.props);
    var friend = this.props.friend.friend;
    var url = this.props.friend.image_url;

    var wishListItems = [];
    for(var i = 0; i < this.props.wishlist.length; i++){
      wishListItems.push(
          <WishListBook user = {this.props.user} friend={this.props.friend.friend} book={this.props.wishlist[i]} key={this.props.wishlist[i].ASIN} removeItem={this.props.removeItem} />
      );
    }
    if(friend !== null){

      return (
        <div>
          <div className="flex-container">
            <div className="giftlist-main container">

              <div className="container flex-container">
                <div className="wishlist-header">
                  <div className="friend-header-name">{friend.name}</div>
                  <div className="friend-header-bday">{formatDate(friend.birthday)}</div>

                </div>

                <div className="wishlist-header">
                  <div className="wishlist-header-aside">
                    <div className="thumbnail profile-photo friend-thumbnail">
                      <img src={url} />
                    </div>
                    <div className="container giftlist-circle"><text>{this.props.wishlist.length}</text></div>
                  </div>
                </div>

              </div>{/* flex-container of friend info */}

            </div>{/* giftlist-main container */}
          </div>{/* flex-container */}

          <div className="giftlist-header row light-teal">Saved Gifts</div>

          <div className="flex-container pinned-gifts">
            {wishListItems}
          </div>
        </div>

      );
    }
  }
});

var mapStateToProps = function(state) {
  return {
  }
};


export default connect(mapStateToProps)(WishList);
