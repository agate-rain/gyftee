var Slider = require('react-slick');
var React = require('react');
var UserHeader = require('../components/userHeader');
var Thumbnail = require('../components/thumbnail');
var RecommendationFilters = require('../components/recommendationFilters');
var BookList = require('../components/bookList');
var BOOKS = require('../../../data/hardCoded').BOOKS;
var USER = require('../../../data/hardCoded').USER;

var GiftRecommendations = React.createClass({
	render: function() {
		return (
      <div className="recommendations">
        <UserHeader user={USER} />
        <RecommendationFilters />
        <BookList data={BOOKS} />
      </div>
		);
	}
});

module.exports = GiftRecommendations;
