var battleController = require('./battleController.js');

module.exports = function (app) {
  app.post('/checkvalidbattleroom', battleController.checkvalidbattleroom);
};
