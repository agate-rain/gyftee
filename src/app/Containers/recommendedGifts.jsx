var Slider = require('react-slick');
var React = require('react');
var UserHeader = require('../Components/userHeader');
var Thumbnail = require('../Components/thumbnail');
var RecommendationFilters = require('../Components/recommendationFilters');
var BookList = require('../Components/bookList');
var BOOKS = require('../../../data/hardCoded').BOOKS;
var USER = require('../../../data/hardCoded').USER;

var GiftRecommendations = React.createClass({
	render: function() {
		return (
      <div className="recommendations">
        <UserHeader user={USER} />
        <RecommendationFilters />
        <BookList amazonBooks={BOOKS} />
      </div>
		);
	}
});

module.exports = GiftRecommendations;
