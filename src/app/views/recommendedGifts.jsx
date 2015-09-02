var Slider = require('react-slick');
var React = require('react');
var UserHeader = require('../components/userHeader.jsx');
var Thumbnail = require('../components/thumbnail.jsx');
var RecommendationFilters = require('../components/recommendationFilters.jsx');
var BookList = require('../components/bookList/jsx');
var BOOKS = require('../../data/hardCoded').BOOKS;
var USER = require('../../data/hardCoded').USER;

var GiftRecommendations = React.createClass({
	render: function() {
		return (
      <div className="recommendations">
        <UserHeader user={this.props.user}/>
        <RecommendationFilters />
        <BookList data={this.props.data} />
      </div>
		);
	}
});

React.render(<GiftRecommendations data={BOOKS} user={USER}/>, document.getElementById('recommended-gifts'));

