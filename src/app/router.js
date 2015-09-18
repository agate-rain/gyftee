"use strict";

var Router = require("react-router");
var routes = require("./routes");

module.exports = Router.create({
  location: Router.HistoryLocation,
  routes: routes
});
