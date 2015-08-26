// requirements
var BattleController = require('../battles/battleController');

var socketList = {};

module.exports = function(socket, io){
  socket.join('dashboard');

  var username = socket.handshake.query.username;
  socketList[username] = socket.id;

  console.log('LINE 11, DASBOARD HANDLER: ', username);
  
  // send signal that user has connected to dashboard
  var updateUsers = function(){
    socket.in('dashboard').emit('updateUsers', socketList);
    socket.emit('updateUsers', socketList);
  }

  // Update Users when first connected
  //
  
  updateUsers();
  
  // look for signal that someone wants to battle
  socket.on('outgoingBattleRequest', function(userData){
    var oppId = socketList[userData.toUser];

    socket.broadcast.to(oppId).emit('incomingBattleRequest', {
      fromUser: userData.fromUser,
      challengeLevel: userData.challengeLevel
    });
  });

  // look for signal that a battle has been accepted
  socket.on('battleAccepted', function(userData) {
    var userId = socketList[userData.user];
    var opponentId = socketList[userData.opponent];
    var challengeLevel = userData.challengeLevel;
    console.log("BATTLE ACCEPTED, CHALLENGE LEVEL: ", challengeLevel);

    BattleController.addBattleRoom(challengeLevel, function(roomhash) {
      // now, need to broadcast to the opponent that it's time for battle
      socket.broadcast.to(opponentId).emit('prepareForBattle', {roomhash: roomhash});

      // and also, broadcast back to user
      io.sockets.connected[userId].emit('prepareForBattle', {roomhash: roomhash});
    });
  });

  socket.on('disconnect', function(){
    console.log('SERVER DISCONNECTing DASHBOARD SOCKET');
    delete socketList[username];

    setTimeout(function() {
      updateUsers();
    }, 200);
  });
};