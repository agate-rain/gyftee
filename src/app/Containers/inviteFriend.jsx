import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../Components/navbar';
import UserHeader from '../Components/userHeader';
import Friend from '../Components/friend';
import { removeFriend } from '../Actions/user';
import { Navigation } from 'react-router';
import FilterableFriends from '../Components/filterableFriends';
import PORT from '../../config/port.js';

var InviteFriend = React.createClass({

  render: function() {
    return (
      <div className='all-friend-list'>
        <Navbar />
        <div className="welcome-container container flex-container">
        </div>
      </div>
    );
  },
});

module.exports = InviteFriend;
