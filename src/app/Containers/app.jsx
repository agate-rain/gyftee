import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
};

function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(mapStateToProps)(App);
