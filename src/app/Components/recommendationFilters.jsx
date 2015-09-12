import React from 'react';

var RecommendationFilters = React.createClass({
  render: function() {
    return (
      <div className="filters">
        <input type="text" placeholder="Filter" />
      </div>
    );
  }
});

export default RecommendationFilters;
