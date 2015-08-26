var duelController = require('./duelController.js');

module.exports = function (app) {
  app.post('/getduel', duelController.getDuel);
  app.post('/attemptduel', duelController.attemptDuel);
};