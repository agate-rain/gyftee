import React from 'react';
import LoggedIn from './loggedIn';
import Home from './home';
import { connect } from 'react-redux';
import { setLock } from '../Actions/user';


var App = React.createClass({

  componentWillMount: function() {
    this.setupAjax();
    this.createLock();
    this.setState({idToken: this.getIdToken()})
  },

  createLock: function() {
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
    this.lock.show({
      connections: ['facebook'],
      icon: '../../src/client/img/gyftee-icon.png',
    });
    this.props.dispatch(setLock(this.lock));
  },

  setupAjax: function() {
    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization',
            'Bearer ' + localStorage.getItem('userToken'));
        }
      }
    });
  },

  getIdToken: function() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  },

  render: function() {
    if (this.state.idToken) {
      return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
    } else {
      return (<Home lock={this.lock} />);
    }
  }
});

var mapStateToProps = function(state) {
  return {
    lock: state.user.lock
  };
};

export default connect(mapStateToProps)(App);
