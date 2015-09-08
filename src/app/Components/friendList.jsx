import React from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import UserHeader from './userHeader';
import Friend from './friend';
import { removeFriend } from '../Actions/user';
import { Navigation } from 'react-router';
import FilterableFriends from './filterableFriends';
import {Link} from 'react-router';

var FriendList = React.createClass({

  mixins: [ Navigation ],

  // clickHandler: function(id) {
  //   this.props.dispatch(removeFriend(id));
  // },

  navToGiftList: function(id) {
    this.transitionTo(`/friends/${id}`);
  },

  navToAllFriendList: function(id) {
    this.transitionTo(`/friends/allfriends`);
  },

  render: function() {

    return (
      <div className='friend-list'>
        <Navbar />
        <FilterableFriends appFriends={this.props.appFriends}/>

        <div className="welcome-container container flex-container">
        </div>
        <div className="bday-list-header"> 3 UPCOMING BIRTHDAYS</div>
        <Link to={`/friends/allfriends`}><button>Get All Friend</button></Link>
          {
            this.props.appFriends.map(function(friend) {

              return (
                <div className="bday-list-container">
                  <div className="bday-list-body seafoam">
                    <div className="bday-row">
                      <div className="heart-div"><a href="#"><i className="glyphicon glyphicon-heart heart"></i></a></div>
                      <div className="bday-list-item friendname">
                        <Friend friend={friend} key={friend.id} onClick={this.navToGiftList.bind(this, friend.id)}/>
                      </div>

                      <div className="date-container">
                        <div>01/01</div>
                      </div>
                    </div>

                  </div>
                </div>
              );

            }, this)
          }
      </div>
    );
  }

});

export default connect()(FriendList);
