import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FriendManager from './friendManager';

import * as friendActions from '../Actions/user';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(nextValue) {
    // Available thanks to contextTypes below
    const { router } = this.context;
    router.transitionTo(`/${nextValue}`);
  }

  setFriends(friends) {

  }

  render() {
    // Injected by React Router

    const { location, children} = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);
    // HEADER COMPONENT will replace the div with GYFTEE!
    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
//   location: PropTypes.shape({
//     pathname: PropTypes.string.isRequired
//   }),
//   params: PropTypes.shape({
//     userLogin: PropTypes.string,
//     repoName: PropTypes.string
//   }).isRequired,
//   children: PropTypes.node
// };

// App.contextTypes = {
//   router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapActionsToProps(dispatch) {

}
// not sure if we need friendActions
// we can dispatch actions using connect on any component, what is best practice?
export default connect( mapStateToProps, friendActions )(App);
