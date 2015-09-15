import { connect } from 'react-redux';
import React from 'react';
import PORT from '../../config/port';
import { Button, Alert } from 'react-bootstrap';

var Concert = React.createClass({

  addToList: function (concertId) {
    // send the clicked book to the server to save on the user's gift list

    var friendId = this.props.friend.friend.id;
    var userId = this.props.user.profile.identities[0].user_id;

    $.ajax({
      url: "http://localhost:" + PORT.PORT + "/api/friends/savegift",
      method: 'POST',
      data: {type: 'music',
            concertId : concertId,
            friendId : friendId,
            userId: userId}, // need to pass in the access token
      success: function(data) {
        console.log("concertId success, data:", data);
        // = JSON.parse(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },

  componentDidMount: function() {
  },

  // enables the fading alert upon pinning item to wishlist
  getInitialState: function() {
    return {
      alertVisible: false
    };
  },

  handleAlertDismiss: function() {
    this.setState({alertVisible: false});
  },

  handleAlertShow: function() {
    this.setState({alertVisible: true});
  },

  render: function() {

    const {concert} = this.props;

    let element;
    if (this.state.alertVisible) {
      element = <Alert className="saved opacity" closeLabel="" onDismiss={this.handleAlertDismiss} dismissAfter={1000}>
        <span> Gift added! </span>
      </Alert>
    }

  var datetime = this.props.concert.details.datetime.replace('T',' ');
    var date = datetime.slice(0,datetime.length - 9);
    var time = datetime.slice(datetime.length - 9, datetime.length-3);
    var datetime = this.props.concert.details.datetime.replace('T',' ');

    return (
      <div className="flex-container seafoam detail-main add-padding">

        <div className="detail-wrapper">
          <div>
            <div className="add-to-list-container">
              <div bsStyle="success" className="add-to-list" onClick={this.addToList.bind(this, concert.details.id)}>
                <Button onClick={this.handleAlertShow} className="button add-to-list-button">
                  <a>
                    <i className="glyphicon add-heart glyphicon-heart"></i>
                  </a> ADD TO LIST
                </Button>
                <div>{element}</div>
              </div>
            </div>

            <div>
              <a href={concert.details.ticket_url} target="_blank">
                <img className="concert-detail-thumb" src={concert.basedOn.thumb_url}></img>
              </a>
            </div>
          </div>

          <div className="concert-details-container">
            <div className="concert-title">{this.props.concert.details.artists[0].name} </div>
            <div className="concert-date">{date} at {time}</div>
            <div className="concert-venue">{this.props.concert.details.venue.name} </div>
            <div className="concert-city">{this.props.concert.details.venue.city} </div>
          </div>

        </div>
      </div>
    );
  }
});

          // <a href={this.props.concert.basedOn.facebook_page_url}><button type="facebook_page_url">Facebook</button></a>
          // <a href={this.props.concert.basedOn.facebook_tour_dates_url}><button type="facebook_tour_date">Tourdate</button></a>

var mapStateToProps = function(state) {
  return {
    friend : state.friend, // export the portion of the state from index.js Reducers
    user : state.user
  }
};

export default connect(mapStateToProps)(Concert);
