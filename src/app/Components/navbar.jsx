import React from 'react';
import { Navigation } from 'react-router';

var Navbar = React.createClass({
  render: function(){
    return (
      <div className="home-container">
        <nav className="navbar navbar-fixed-top gyftee-nav teal" role="navigation">
          <div className="container">
            <div className="navbar-toggle" data-toggle="collapse">
              <span className="icon-bar white"></span>
              <span className="icon-bar white"></span>
              <span className="icon-bar white"></span>
            </div>

            <div className="navbar-brand">
              <a className="white-font" href="#"><img className="brand-icon" src="../../src/client/img/g-icon.png"/>Gyftee</a>
            </div>

            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <a className="nav-menu-item" href="#"></a>
                </li>
              </ul>
            </div>

          </div>
        </nav>
      </div>
    );
  }

});

export default Navbar;
