var React = require('react');

var RecommendationFilters = React.createClass({
  render: function() {
    return (
      <div className="filters">
        <input type="text" placeholder="Filter" />
      </div>
    );
  }
});

module.exports = RecommendationFilters;
