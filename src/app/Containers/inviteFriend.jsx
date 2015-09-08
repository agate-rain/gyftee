import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../Components/navbar';

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

export default InviteFriend;
