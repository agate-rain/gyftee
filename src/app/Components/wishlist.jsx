import React from 'react';
import PORT from '../../config/port';
import WishListBook from './wishListBook';
import { formatDate } from '../Utils/utils';
import { connect } from 'react-redux';
import { fetchFriend, saveImageUrl} from '../Actions/friend';
import utils from '../Utils/utils';

var WishList = React.createClass({

  componentDidMount: function() {
    var friendId = this.props.friend.friend.id;
    utils.fetchFriendById(friendId, function(friend) {
      this.props.dispatch(fetchFriend(friend));
    }.bind(this));

    utils.fetchImageUrlById(friendId, function(image) {
      this.props.dispatch(saveImageUrl(image));
    }.bind(this));
  },

  render: function() {
    var friend = this.props.friend.friend;
    var url = this.props.friend.image_url;
    var books = this.props.wishlist.books;
    // TODO REFACTOR TO SHOW ALL GIFTS, NOT JUST BOOKS
    var wishListItems = [];
    for (var i = 0; i < books.length; i++) {
      wishListItems.push(
        <WishListBook user={this.props.user} friend={this.props.friend.friend}
          book={books[i]} key={books[i].ASIN}
          removeItem={this.props.removeItem} />
      );
    }

    return (
      <div>
        <div className="flex-container">
          <div className="giftlist-main container">
            <div className="container flex-container">
              <div className="wishlist-header slideRight">
                <div className="friend-header-name">{friend.name}</div>
                <div className="friend-header-bday">{formatDate(friend.birthday)}</div>
              </div>
              <div className="wishlist-header">
                <div className="wishlist-header-aside">
                  <div className="thumbnail profile-photo friend-thumbnail slideLeft">
                    <img src={url} />
                  </div>
                  <div className="container giftlist-circle slideLeft">
                    <text>{this.props.items}</text>
                  </div>
                </div>
              </div>
            </div>{/* flex-container of friend info */}
          </div>{/* giftlist-main container */}
        </div>{/* flex-container */}

        <div className="giftlist-header row light-teal">Saved Gifts</div>

        {(() => {

          if (wishListItems.length > 0) {
            return (
              <div className="flex-container pinned-gifts">{wishListItems}</div>
            );
          } else {
            return (
              <div>
                <div>No pinned gifts</div>
                <div className="button recommendations-button" onClick={this.props.navToFriendRecs.bind(this, this.props.friend.friend.id)}>
                  SEE GIFT RECOMMENDATIONS
                </div>
              </div>
            );
          }
        })()}
      </div>
    );
  }
});

var mapStateToProps = function(state) {
  return {
    state
  }
};

export default connect(mapStateToProps)(WishList);
